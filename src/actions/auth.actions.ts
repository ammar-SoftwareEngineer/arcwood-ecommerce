"use server";

import { cookies } from "next/headers";

export async function loginAction(data: {
  email: string;
  password: string;
}) {
  if (
    data.email === "admin@test.com" &&
    data.password === "123456"
  ) {
    const cookieStore = await cookies();

    cookieStore.set("session", "logged-in");

    return {
      success: true,
    };
  }

  return {
    error: "Invalid credentials",
  };
}