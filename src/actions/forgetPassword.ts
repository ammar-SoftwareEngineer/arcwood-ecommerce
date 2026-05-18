"use server";

import crypto from "node:crypto";
import { getSupabase } from "@/lib/supabase";
import { sendResetEmail } from "@/lib/mail/resend";

function getAppUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export async function forgetPasswordAction(email: string, locale: string) {
  try {
    const supabase = getSupabase();
    const normalizedEmail = email.trim().toLowerCase();

    const { data: user, error: findError } = await supabase
      .from("users")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (findError) {
      console.error("forgetPassword find:", findError.message);
      return { ok: true as const };
    }

  
    if (!user) {
      return {
        ok: false,
        error: "No account found with this email. Please register or check the spelling.",
      };
    }
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    const { error: updateError } = await supabase
      .from("users")
      .update({ reset_token: token, reset_token_expiry: expiry })
      .eq("id", user.id);

    if (updateError) {
      console.error("forgetPassword update:", updateError.message);
      return {
        ok: false as const,
        error:
          "We could not start the reset process. Ask your admin to add reset_token and reset_token_expiry columns on the users table in Supabase.",
      };
    }

    const resetLink = `${getAppUrl()}/${locale}/reset-password?token=${token}`;
    const mail = await sendResetEmail(normalizedEmail, resetLink);

    if (!mail.ok) {
      console.error(
        "forgetPassword: email failed — verify RESEND_API_KEY and a verified RESEND_FROM_EMAIL domain on Vercel"
      );
      // Token is already saved; do not show a scary error to the user
      return { ok: true as const };
    }

    return { ok: true as const };
  } catch (error) {
    console.error("forgetPasswordAction:", error);
    return {
      ok: false as const,
      error: "Something went wrong. Please try again later.",
    };
  }
}
