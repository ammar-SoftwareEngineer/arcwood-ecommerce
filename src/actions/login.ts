"use server";

import { signInWithCredentials } from "@/lib/nextAuth";

export async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return signInWithCredentials(email, password);
}
