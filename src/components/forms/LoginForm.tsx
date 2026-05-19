"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/actions/login";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { loginSchema } from "@/lib/validation/auth.schema";
import { toast } from "sonner";

type LoginFormValues = z.infer<typeof loginSchema>;

const inputClass =
  "w-full rounded-0 border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition focus:border-(--primary) focus:outline-none focus:ring-1 focus:ring-(--primary)";

export default function LoginForm() {
  const t = useTranslations("auth.login");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    const result = await loginAction({
      email: data.email,
      password: data.password,
    });

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    toast.success("Welcome back! You are signed in.");
    // Full page load so the session cookie is applied before home renders
    window.location.assign("/");
  }

  return (
    <section className="container mx-auto px-8 py-12 md:py-20 lg:px-6 xl:px-16">
      <div className="mx-auto max-w-md border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
        <h2 className="mb-10 text-center text-3xl md:text-4xl">{t("title")}</h2>

        <form
          method="post"
          onSubmit={handleSubmit(onSubmit, () => {
            const msg = errors.email?.message ?? errors.password?.message;
            if (msg) toast.error(msg);
          })}
          className="space-y-6"
          noValidate
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-widest text-neutral-600"
            >
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
            {errors.email?.message ? (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-widest text-neutral-600"
              >
                {t("password")}
              </label>
              <Link
                href="/forget-password"
                className="text-xs font-medium uppercase tracking-wide text-main transition hover:opacity-80"
              >
                {t("forgotPassword")}
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder={t("passwordPlaceholder")}
              className={inputClass}
              {...register("password")}
            />
            {errors.password?.message ? (
              <p className="text-sm text-red-600">{errors.password.message}</p>
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
            {t("noAccount")}{" "}
            <Link href="/register" className="font-semibold text-main transition hover:opacity-80">
              {t("register")}
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
