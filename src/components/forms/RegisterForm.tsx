"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "@/actions/register";
import FormField from "@/components/ui/FormField";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { registerSchema } from "@/lib/validation/auth.schema";
import { toast } from "sonner";

type RegisterFormValues = z.infer<typeof registerSchema>;

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
          method="post"
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
          <FormField
            id="name"
            label={t("name")}
            type="text"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            error={errors.name?.message}
            {...register("name")}
          />

          <FormField
            id="email"
            label={t("email")}
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            error={errors.email?.message}
            {...register("email")}
          />

          <FormField
            id="password"
            label={t("password")}
            type="password"
            autoComplete="new-password"
            placeholder={t("passwordPlaceholder")}
            error={errors.password?.message}
            {...register("password")}
          />

          <FormField
            id="confirmPassword"
            label={t("confirmPassword")}
            type="password"
            autoComplete="new-password"
            placeholder={t("confirmPasswordPlaceholder")}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

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
