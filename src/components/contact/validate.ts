import { site } from "@/content/site";

export type FormValues = {
  name: string;
  business: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export type FieldName = keyof FormValues;
export type FormErrors = Partial<Record<FieldName, string>>;

const f = site.form.fields;
export const SERVICE_VALUES = f.service.options.map((o) => o.value) as string[];

/** 10-digit Indian number, or "+" followed by 8–15 digits. Spaces are ignored. */
export function isValidPhone(raw: string): boolean {
  const v = raw.replace(/\s+/g, "");
  return /^\d{10}$/.test(v) || /^\+\d{8,15}$/.test(v);
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

export function validateField(name: FieldName, values: FormValues): string | undefined {
  const v = values[name].trim();
  switch (name) {
    case "name":
      if (!v) return f.name.errorRequired;
      if (v.length < 2 || v.length > 80) return f.name.errorLength;
      return;
    case "phone":
      if (!v) return f.phone.errorRequired;
      if (!isValidPhone(v)) return f.phone.errorFormat;
      return;
    case "email":
      if (v && !isValidEmail(v)) return f.email.errorFormat;
      return;
    case "service":
      if (!SERVICE_VALUES.includes(v)) return f.service.errorRequired;
      return;
    default:
      return;
  }
}

export function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  for (const key of ["name", "phone", "email", "service"] as const) {
    const err = validateField(key, values);
    if (err) errors[key] = err;
  }
  return errors;
}
