import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import bcrypt from "bcryptjs";
import { getSupabase } from "@/lib/supabase";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret:
    process.env.AUTH_SECRET?.trim() ??
    process.env.NEXTAUTH_SECRET?.trim() ??
    (process.env.NODE_ENV === "development"
      ? "arcwood-dev-only-change-in-production"
      : undefined),
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = (credentials.email as string).trim().toLowerCase();
        const supabase = getSupabase();
        const { data: user } = await supabase
          .from("users")
          .select("id, name, email, password")
          .eq("email", email)
          .maybeSingle();

        if (!user?.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
});

type SignInResult =
  | { ok: true }
  | { ok: false; error: string };

/** Use this from server actions — handles Next.js redirect quirks after signIn. */
export async function signInWithCredentials(
  email: string,
  password: string
): Promise<SignInResult> {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { ok: true };
  } catch (error) {
    // Next.js may throw on successful auth in some setups — treat as success
    if (isRedirectError(error)) {
      return { ok: true };
    }

    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          ok: false,
          error: "Invalid email or password. Please try again.",
        };
      }
      console.error("signIn AuthError:", error.type, error.message);
    } else {
      console.error("signIn error:", error);
    }

    return {
      ok: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
