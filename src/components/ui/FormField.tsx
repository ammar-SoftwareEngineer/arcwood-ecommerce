"use client";

import type {
  InputHTMLAttributes,
  Ref,
  TextareaHTMLAttributes,
} from "react";

const inputClass =
  "w-full rounded-0 border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition focus:border-(--primary) focus:outline-none focus:ring-1 focus:ring-(--primary)";

type Props = {
  id: string;
  label: string;
  error?: string;
  wrapperClassName?: string;
  multiline?: boolean;
  rows?: number;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function FormField({
  id,
  label,
  error,
  wrapperClassName,
  multiline,
  rows = 4,
  className,
  ref,
  ...props
}: Props) {
  const fieldClass = className ? `${inputClass} ${className}` : inputClass;

  return (
    <div className={wrapperClassName}>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold uppercase tracking-widest text-neutral-600"
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          className={fieldClass}
          ref={ref as Ref<HTMLTextAreaElement>}
          {...props}
        />
      ) : (
        <input
          id={id}
          className={fieldClass}
          ref={ref as Ref<HTMLInputElement>}
          {...props}
        />
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
