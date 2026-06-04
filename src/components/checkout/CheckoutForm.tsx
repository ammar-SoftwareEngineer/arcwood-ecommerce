"use client";

import { useEffect } from "react";
import { checkoutAction } from "@/actions/checkout";
import FormField from "@/components/ui/FormField";
import { useRouter } from "@/i18n/navigation";
import {
  cartDiscountAmount,
  cartTotal,
} from "@/lib/cart/coupon";
import { cartSubtotal } from "@/lib/cart/utils";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/lib/validation/checkout.schema";
import { useCartStore } from "@/store/cartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { toast } from "sonner";

const selectClass =
  "w-full border border-neutral-300 bg-white px-4 py-3 text-base " +
  "text-neutral-900 transition focus:border-(--primary) focus:outline-none focus:ring-1 focus:ring-(--primary)";

export default function CheckoutForm() {
  const t = useTranslations("checkout.form");
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const coupon = useCartStore((s) => s.coupon);
  const loading = useCartStore((s) => s.loading);
  const loadCart = useCartStore((s) => s.loadCart);

  const subtotal = cartSubtotal(items);
  const discount = cartDiscountAmount(subtotal, coupon);
  const total = cartTotal(subtotal, coupon);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cod",
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
    },
  });

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    setValue(
      "items",
      items.map((item) => ({
        product_id: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price_egp: item.price_egp,
      })),
    );
    setValue("subtotal", subtotal);
    setValue("discount", discount);
    setValue("total", total);
    setValue("couponCode", coupon?.code);
  }, [items, subtotal, discount, total, coupon, setValue]);

  async function onSubmit(data: CheckoutFormValues) {
    const result = await checkoutAction(data);

    if (!result.ok) {
      toast.error(result.error ?? t("error"));
      return;
    }

    toast.success(t("success", { orderId: result.orderId }));
    router.push("/");
  }

  if (loading) {
    return (
      <div className="border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-black/60">{t("loading")}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-4 text-xl font-semibold text-neutral-900">{t("title")}</h2>
        <p className="text-black/70">{t("emptyCart")}</p>
      </div>
    );
  }

  return (
    <div className="border border-neutral-200 bg-white p-6 shadow-sm md:p-8 lg:p-10">
      <h2 className="mb-6 text-xl font-semibold text-neutral-900">{t("title")}</h2>

      <form
        method="post"
        onSubmit={handleSubmit(onSubmit, () => {
          const firstError = Object.values(errors)[0]?.message;
          if (firstError) toast.error(firstError);
        })}
        className="space-y-4"
        noValidate
      >
        <div className="grid grid-cols-12 gap-4">
          <FormField
            id="checkoutFirstName"
            label={t("firstName")}
            placeholder={t("firstNamePlaceholder")}
            className="col-span-12 md:col-span-6"
            autoComplete="given-name"
            error={errors.firstName?.message}
            {...register("firstName")}
          />

          <FormField
            id="checkoutLastName"
            label={t("lastName")}
            placeholder={t("lastNamePlaceholder")}
            className="col-span-12 md:col-span-6"
            autoComplete="family-name"
            error={errors.lastName?.message}
            {...register("lastName")}
          />

          <FormField
            id="checkoutEmail"
            label={t("email")}
            type="email"
            placeholder={t("emailPlaceholder")}
            className="col-span-12 md:col-span-6"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <FormField
            id="checkoutPhone"
            label={t("phone")}
            type="tel"
            placeholder={t("phonePlaceholder")}
            className="col-span-12 md:col-span-6"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />

          <FormField
            id="checkoutAddress"
            label={t("address")}
            placeholder={t("addressPlaceholder")}
            className="col-span-12"
            autoComplete="street-address"
            error={errors.address?.message}
            {...register("address")}
          />

          <FormField
            id="checkoutCity"
            label={t("city")}
            placeholder={t("cityPlaceholder")}
            className="col-span-12 md:col-span-6"
            autoComplete="address-level2"
            error={errors.city?.message}
            {...register("city")}
          />

          <div className="col-span-12 md:col-span-6">
            <label
              htmlFor="checkoutGovernorate"
              className="mb-2 block text-xs font-semibold uppercase tracking-widest text-neutral-600"
            >
              {t("governorate")}
            </label>
            <select
              id="checkoutGovernorate"
              className={selectClass}
              aria-invalid={!!errors.governorate}
              {...register("governorate")}
            >
              <option value="" disabled>
                {t("governoratePlaceholder")}
              </option>
              <option value="Cairo">{t("gov.cairo")}</option>
              <option value="Giza">{t("gov.giza")}</option>
              <option value="Alexandria">{t("gov.alexandria")}</option>
              <option value="Qalyubia">{t("gov.qalyubia")}</option>
              <option value="Sharqia">{t("gov.sharqia")}</option>
              <option value="Dakahlia">{t("gov.dakahlia")}</option>
              <option value="Other">{t("gov.other")}</option>
            </select>
            {errors.governorate?.message ? (
              <p className="mt-1 text-sm text-red-600">{errors.governorate.message}</p>
            ) : null}
          </div>

          <FormField
            id="checkoutNotes"
            label={t("notes")}
            multiline
            rows={3}
            placeholder={t("notesPlaceholder")}
            className="col-span-12"
            error={errors.notes?.message}
            {...register("notes")}
          />

          <fieldset className="col-span-12 space-y-3">
            <legend className="mb-2 block text-xs font-semibold uppercase tracking-widest text-neutral-600">
              {t("paymentMethod")}
            </legend>
            <label className="flex cursor-pointer items-center gap-3 border border-neutral-200 px-4 py-3 has-checked:border-main has-checked:bg-main/5">
              <input
                type="radio"
                value="cod"
                className="accent-(--primary)"
                {...register("paymentMethod")}
              />
              <span className="text-sm font-medium text-neutral-900">{t("payment.cod")}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 border border-neutral-200 px-4 py-3 has-checked:border-main has-checked:bg-main/5">
              <input
                type="radio"
                value="bank"
                className="accent-(--primary)"
                {...register("paymentMethod")}
              />
              <span className="text-sm font-medium text-neutral-900">{t("payment.bank")}</span>
            </label>
            {errors.paymentMethod?.message ? (
              <p className="text-sm text-red-600">{errors.paymentMethod.message}</p>
            ) : null}
          </fieldset>

          <div className="col-span-12">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cta mt-2 inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <span>{isSubmitting ? t("submitting") : t("submit")}</span>
              <FaCheck size={16} aria-hidden />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
