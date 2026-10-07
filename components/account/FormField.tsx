import React from 'react';

interface Props {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
  placeholder?: string;
}

export default function FormField({
  name,
  label,
  type = 'text',
  required,
  autoComplete,
  defaultValue,
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-[var(--color-muted)] font-medium"
      >
        {label}
        {required && <span className="text-[var(--color-danger)] ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete ?? name}
        className="
          w-full bg-transparent border border-[var(--color-border)] px-4 py-3
          font-[family-name:var(--font-body)] text-sm text-[var(--color-text)]
          placeholder:text-[var(--color-subtle)] focus:outline-none focus:ring-1
          focus:ring-[var(--color-gold)] focus:border-[var(--color-gold)]
          rounded-none transition-colors
        "
      />
    </div>
  );
}
