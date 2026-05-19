"use client";

import { contactAction } from "@/actions/contact";
import FormField from "@/components/ui/FormField";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa6";
import { toast } from "sonner";

export default function ContactForm() {
  const t = useTranslations("contact.form");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    const result = await contactAction(data);

    if (!result.ok) {
      toast.error(result.error ?? t("error"));
      return;
    }

    toast.success(t("success"));
    reset();
  }

  return (
    <div className="border border-neutral-200 bg-white p-6 shadow-sm md:p-8 lg:p-10">
      <h2 className="mb-6 text-xl font-semibold text-neutral-900">{t("title")}</h2>

      <form
        method="post"
        onSubmit={handleSubmit(onSubmit, () => {
          const msg =
            errors.name?.message ??
            errors.email?.message ??
            errors.message?.message;
          if (msg) toast.error(msg);
        })}
        className="space-y-4"
        noValidate
      >
        <div className="grid grid-cols-12 gap-4">
          <FormField
            id="contactName"
            label={t("name")}
            placeholder={t("namePlaceholder")}
            autoComplete="name"
            wrapperClassName="col-span-12 md:col-span-6"
            error={errors.name?.message}
            {...register("name")}
          />

          <FormField
            id="contactEmail"
            label={t("email")}
            type="email"
            placeholder={t("emailPlaceholder")}
            autoComplete="email"
            wrapperClassName="col-span-12 md:col-span-6"
            error={errors.email?.message}
            {...register("email")}
          />

          <FormField
            id="contactPhone"
            label={t("phone")}
            type="tel"
            placeholder={t("phonePlaceholder")}
            autoComplete="tel"
            wrapperClassName="col-span-12"
            {...register("phone")}
          />

          <FormField
            id="contactSubject"
            label={t("subject")}
            placeholder={t("subjectPlaceholder")}
            wrapperClassName="col-span-12"
            {...register("subject")}
          />

          <FormField
            id="contactMessage"
            label={t("message")}
            multiline
            rows={4}
            placeholder={t("messagePlaceholder")}
            wrapperClassName="col-span-12"
            error={errors.message?.message}
            {...register("message")}
          />

          <div className="col-span-12">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cta mt-2 inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{isSubmitting ? t("submitting") : t("submit")}</span>
              <FaPaperPlane size={16} aria-hidden />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
