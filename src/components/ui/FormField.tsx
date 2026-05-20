type FormFieldProps = {
  id: string
  label: string
  multiline?: boolean
  rows?: number
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function FormField({
  id,
  label,
  multiline,
  rows = 4,
  error,
  className,
  ...props
}: FormFieldProps) {
  const baseClass =
    "w-full border border-neutral-300 bg-white px-4 py-3 text-base " +
    "text-neutral-900 placeholder:text-neutral-400 transition " +
    "focus:border-(--primary) focus:outline-none focus:ring-1 focus:ring-(--primary)"

  return (
    <div className={className ? className : ""}>
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
          className={baseClass}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={baseClass}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      )}

      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}