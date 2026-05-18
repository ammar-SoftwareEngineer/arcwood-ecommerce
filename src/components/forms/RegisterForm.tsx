"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "@/actions/register";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { registerSchema } from "@/lib/validation/auth.schema";
import { toast } from "sonner";

type RegisterFormValues = z.infer<typeof registerSchema>;

const inputClass =
  "w-full rounded-0 border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition focus:border-(--primary) focus:outline-none focus:ring-1 focus:ring-(--primary)";

export default function RegisterForm() {
  const t = useTranslations("auth.register");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormValues) {
    const result = await registerAction({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    toast.success("Account created successfully. Welcome!");
    window.location.assign("/");
  }

  return (
    <section className="container mx-auto px-8 py-12 md:py-20 lg:px-6 xl:px-16">
      <div className="mx-auto max-w-md border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
        <h2 className="mb-10 text-center text-3xl md:text-4xl">{t("title")}</h2>

        <form
          onSubmit={handleSubmit(onSubmit, () => {
            const msg =
              errors.name?.message ??
              errors.email?.message ??
              errors.password?.message ??
              errors.confirmPassword?.message;
            if (msg) toast.error(msg);
          })}
          className="space-y-6"
          noValidate
        >
          <div className="space-y-2">
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-neutral-600">
              {t("name")}
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder={t("namePlaceholder")}
              className={inputClass}
              {...register("name")}
            />
            {errors.name?.message ? <p className="text-sm text-red-600">{errors.name.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-neutral-600">
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              className={inputClass}
              {...register("email")}
            />
            {errors.email?.message ? <p className="text-sm text-red-600">{errors.email.message}</p> : null}
          </div>

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

          <p className="text-center text-sm text-neutral-600">
            {t("hasAccount")}{" "}
            <Link href="/login" className="font-semibold text-main transition hover:opacity-80">
              {t("login")}
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
