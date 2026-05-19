"use server";

import { signIn } from "@/lib/nextAuth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export type LoginResult = { ok: true } | { ok: false; error: string };

export async function signInWithCredentials(
  email: string,
  password: string
): Promise<LoginResult> {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { ok: true };
  } catch (error) {
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

export async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResult> {
  return signInWithCredentials(email, password);
}
