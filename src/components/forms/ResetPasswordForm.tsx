"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { resetPasswordAction } from "@/actions/resetPassword";
import { resetPasswordSchema } from "@/lib/validation/auth.schema";
import { toast } from "sonner";

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const inputClass =
  "w-full rounded-0 border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition focus:border-(--primary) focus:outline-none focus:ring-1 focus:ring-(--primary)";

type ResetPasswordFormProps = {
  token: string | null;
};

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const t = useTranslations("auth.resetPassword");
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  if (!token) {
    return (
      <section className="container mx-auto px-8 py-12 md:py-20 lg:px-6 xl:px-16">
        <div className="mx-auto max-w-md border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-6 text-center text-3xl md:text-4xl">{t("title")}</h2>
          <p role="alert" className="mb-6 text-center text-sm text-red-600">
            {t("missingToken")}
          </p>
          <Link href="/forget-password" className="cta block w-full text-center">
            {t("requestNewLink")}
          </Link>
        </div>
      </section>
    );
  }

  async function onSubmit(data: ResetPasswordFormValues) {
    if (!token) return;
    const result = await resetPasswordAction(token, data.password);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    toast.success("Your password was updated. You can sign in now.");
    setDone(true);
  }

  if (done) {
    return (
      <section className="container mx-auto px-8 py-12 md:py-20 lg:px-6 xl:px-16">
        <div className="mx-auto max-w-md border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
          <p
            role="status"
            className="mb-6 rounded-0 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
          >
            {t("success")}
          </p>
          <Link href="/login" className="cta block w-full text-center">
            {t("backToLogin")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-8 py-12 md:py-20 lg:px-6 xl:px-16">
      <div className="mx-auto max-w-md border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
        <h2 className="mb-4 text-center text-3xl md:text-4xl">{t("title")}</h2>
        <p className="mb-10 text-center text-sm text-neutral-600">{t("description")}</p>

        <form
          method="post"
          onSubmit={handleSubmit(onSubmit, () => {
            const msg = errors.password?.message ?? errors.confirmPassword?.message;
            if (msg) toast.error(msg);
          })}
          className="space-y-6"
          noValidate
        >
          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest text-neutral-600">
              {t("password")}
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder={t("passwordPlaceholder")}
              className={inputClass}
              {...register("password")}
            />
            {errors.password?.message ? <p className="text-sm text-red-600">{errors.password.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-widest text-neutral-600">
              {t("confirmPassword")}
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder={t("confirmPasswordPlaceholder")}
              className={inputClass}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message ? (
              <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
            ) : null}
          </div>

          <button type="submit" disabled={isSubmitting} className="cta w-full disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? t("submitting") : t("submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
