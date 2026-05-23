/**
 * Client-side coupon validation and totals (demo codes until Supabase backend).
 * Coupon state lives in `cartStore`; checkout should read the same `coupon` field later.
 */
import { toast } from "sonner";

export type CartCoupon = {
  code: string;
  discountPercent: number;
};

export type CouponResult =
  | { ok: true; coupon: CartCoupon }
  | { ok: false; messageKey: "cartCouponEmpty" | "cartCouponInvalid" };

/** Demo codes — replace with Server Action + DB when checkout is wired. */
const COUPON_RATES: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
  ARCWOOD: 15,
};

export function validateCoupon(rawCode: string): CouponResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { ok: false, messageKey: "cartCouponEmpty" };
  const discountPercent = COUPON_RATES[code];
  if (!discountPercent) return { ok: false, messageKey: "cartCouponInvalid" };
  return { ok: true, coupon: { code, discountPercent } };
}

export function cartDiscountAmount(subtotal: number, coupon: CartCoupon | null) {
  if (!coupon || subtotal <= 0) return 0;
  return Math.round((subtotal * coupon.discountPercent) / 100);
}

export function cartTotal(subtotal: number, coupon: CartCoupon | null) {
  return Math.max(0, subtotal - cartDiscountAmount(subtotal, coupon));
}

type ToastT = (key: string, values?: Record<string, string | number>) => string;

/** Coupon form submit — uncontrolled input via FormData, no local state. */
export function submitCartCouponForm(
  form: HTMLFormElement,
  applyCoupon: (code: string) => CouponResult,
  toastT: ToastT,
) {
  const code = new FormData(form).get("code")?.toString() ?? "";
  const result = applyCoupon(code);
  if (result.ok) {
    toast.success(toastT("cartCouponApplied", { code: result.coupon.code, percent: result.coupon.discountPercent }));
    form.reset();
  } else {
    toast.error(toastT(result.messageKey));
  }
}
