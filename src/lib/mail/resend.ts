import { Resend } from "resend";

export async function sendResetEmail(email: string, resetLink: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false as const };

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? "arcwood-dev@resend.dev";

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "Reset your password",
    html: `
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });

  if (error) {
    console.error("sendResetEmail:", error.message);
    return { ok: false as const };
  }

  return { ok: true as const };
}
