"use server";

import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact.schema";

export type ContactActionResult = { ok: true } | { ok: false; error: string };

export async function contactAction(
  data: ContactFormValues,
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }
  console.info("contact message:", parsed.data);

  return { ok: true };
}
