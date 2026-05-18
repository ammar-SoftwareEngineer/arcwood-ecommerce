"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { forgetPasswordAction } from "@/actions/forgetPassword";
import { forgetPasswordSchema } from "@/lib/validation/auth.schema";
import { toast } from "sonner";

type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;

const inputClass =
  "w-full rounded-0 border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition focus:border-(--primary) focus:outline-none focus:ring-1 focus:ring-(--primary)";

export default function ForgetPassword() {
  const locale = useLocale();
  const t = useTranslations("auth.forgetPassword");
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  async function onSubmit(data: ForgetPasswordFormValues) {
    const result = await forgetPasswordAction(data.email, locale);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    toast.success(
      "If an account exists for this email, you will receive a reset link shortly."
    );
    setSent(true);
    reset();
  }

  return (
    <section className="container mx-auto px-8 py-12 md:py-20 lg:px-6 xl:px-16">
      <div className="mx-auto max-w-md border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
        <h2 className="mb-4 text-center text-3xl md:text-4xl">{t("title")}</h2>
        <p className="mb-10 text-center text-sm text-neutral-600">{t("description")}</p>

        {sent ? (
          <div className="space-y-6">
            <p
              role="status"
              className="rounded-0 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
            >
              {t("success")}
            </p>
            <Link href="/login" className="cta block w-full text-center">
              {t("backToLogin")}
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit, () => {
              if (errors.email?.message) toast.error(errors.email.message);
            })}
            className="space-y-6"
            noValidate
          >
            <div className="space-y-2">
              <label
                htmlFor="forget-email"
                className="block text-xs font-semibold uppercase tracking-widest text-neutral-600"
              >
                {t("email")}
              </label>
              <input
                id="forget-email"
                type="email"
                autoComplete="email"
                placeholder={t("emailPlaceholder")}
                className={inputClass}
                {...register("email")}
              />
              {errors.email?.message ? (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cta w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? t("submitting") : t("submit")}
            </button>

            <p className="text-center text-sm text-neutral-600">
              {t("rememberPassword")}{" "}
              <Link href="/login" className="font-semibold text-main transition hover:opacity-80">
                {t("login")}
              </Link>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
