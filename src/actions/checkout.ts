"use server";

import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/lib/validation/checkout.schema";

export type CheckoutActionResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

export async function checkoutAction(
  data: CheckoutFormValues,
): Promise<CheckoutActionResult> {
  const parsed = checkoutSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  const orderId = `ARC-${Date.now()}`;
  console.info("checkout order:", { orderId, ...parsed.data });

  return { ok: true, orderId };
}
