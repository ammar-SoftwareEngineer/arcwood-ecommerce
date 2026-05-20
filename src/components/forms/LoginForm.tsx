"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/actions/login";
import FormField from "@/components/ui/FormField";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { loginSchema } from "@/lib/validation/auth.schema";
import { toast } from "sonner";

type LoginFormValues = z.infer<typeof loginSchema>;

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
          <FormField
            id="email"
            label={t("email")}
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="relative">
            <Link
              href="/forget-password"
              className="absolute top-0 right-0 z-10 text-xs font-medium uppercase tracking-wide text-main transition hover:opacity-80"
            >
              {t("forgotPassword")}
            </Link>
            <FormField
              id="password"
              label={t("password")}
              type="password"
              autoComplete="current-password"
              placeholder={t("passwordPlaceholder")}
              error={errors.password?.message}
              {...register("password")}
            />
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
