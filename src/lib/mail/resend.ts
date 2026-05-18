import { Resend } from "resend";

/**
 * Sends password-reset email.
 * Resend test mode (onboarding@resend.dev) only delivers to your Resend account email.
 * Set RESEND_DEV_TO in .env.local for local testing, or verify a domain for production.
 */
export async function sendResetEmail(email: string, resetLink: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.log("[reset-email] No RESEND_API_KEY. Link:", resetLink);
      return { ok: true as const };
    }
    return { ok: false as const };
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL?.trim() ?? "onboarding@resend.dev";

  const devInbox = process.env.RESEND_DEV_TO?.trim();
  const isDevRedirect =
    process.env.NODE_ENV === "development" && Boolean(devInbox);

  const to = isDevRedirect ? devInbox! : email;

  const html = isDevRedirect
    ? `
      <p><strong>Dev only:</strong> password reset was requested for <code>${email}</code>.</p>
      <p><a href="${resetLink}">Reset password</a></p>
      <p>Link expires in 15 minutes.</p>
    `
    : `
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link expires in 15 minutes.</p>
    `;

  const { error } = await resend.emails.send({
    from,
    to,
    subject: isDevRedirect
      ? `[Dev] Reset password for ${email}`
      : "Reset your password",
    html,
  });

  if (error) {
    console.error("sendResetEmail:", error.message);

    if (process.env.NODE_ENV === "development") {
      console.log(`[reset-email] Could not send to ${email}. Use this link:\n${resetLink}`);
      return { ok: true as const };
    }

    return { ok: false as const };
  }

  return { ok: true as const };
}
