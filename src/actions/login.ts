"use server";

import { signIn } from "@/lib/nextAuth";

export async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { ok: true as const };
  } catch {
    return {
      ok: false as const,
      error: "Invalid email or password. Please try again.",
    };
  }
}
