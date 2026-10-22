"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { site } from "@/content/site";
import { ArrowIcon } from "@/components/ui/Icons";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import {
  SERVICE_VALUES,
  validateAll,
  validateField,
  type FieldName,
  type FormErrors,
  type FormValues,
} from "./validate";

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

const ORDER: FieldName[] = ["name", "phone", "email", "service"];

/** Inputs are uncontrolled, so anything typed before hydration (slow phones) is kept. */
function readValues(form: HTMLFormElement): FormValues {
  const data = new FormData(form);
  const get = (k: FieldName) => String(data.get(k) ?? "");
  return {
    name: get("name"),
    business: get("business"),
    phone: get("phone"),
    email: get("email"),
    service: get("service"),
    message: get("message"),
  };
}

export function EnquiryForm() {
  const t = site.form;
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // ?service= pre-selects an option (from the Services links), unless one is already chosen
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    const form = formRef.current;
    if (form && service && SERVICE_VALUES.includes(service) && !readValues(form).service) {
      const radio = form.querySelector<HTMLInputElement>(
        `input[name="service"][value="${service}"]`,
      );
      if (radio) radio.checked = true;
    }
    if (!ACCESS_KEY) {
      console.warn(
        "[EnquiryForm] NEXT_PUBLIC_WEB3FORMS_KEY is not set, so enquiries cannot be sent. " +
          "Add it to .env.local (and to the Cloudflare Pages environment) and rebuild. " +
          "Until then, submitting shows the error state with WhatsApp and email fallbacks.",
      );
    }
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  // once a field has an error, re-check it as the visitor fixes it
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName;
    if (errors[name] && formRef.current) {
      const err = validateField(name, readValues(formRef.current));
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const values = readValues(form);

    const found = validateAll(values);
    setErrors(found);
    const firstInvalid = ORDER.find((k) => found[k]);
    if (firstInvalid) {
      form
        .querySelector<HTMLElement>(
          firstInvalid === "service" ? 'input[name="service"]' : `#field-${firstInvalid}`,
        )
        ?.focus();
      return;
    }

    if (!ACCESS_KEY) {
      console.warn("[EnquiryForm] Not sent: NEXT_PUBLIC_WEB3FORMS_KEY is missing.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const serviceLabel =
      t.fields.service.options.find((o) => o.value === values.service)?.label ?? values.service;
    const botcheck =
      form.querySelector<HTMLInputElement>('input[name="botcheck"]')?.checked ?? false;
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: t.subject(values.name.trim(), serviceLabel),
          from_name: t.fromName,
          name: values.name.trim(),
          business: values.business.trim(),
          phone: values.phone.replace(/\s+/g, ""),
          email: values.email.trim(),
          service: serviceLabel,
          message: values.message.trim(),
          botcheck,
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
      setStatus(res.ok && data?.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="state-in border border-line bg-ink-900 p-6 sm:p-10">
        <span aria-hidden="true" className="block h-px w-12 bg-success" />
        <h3 ref={successRef} tabIndex={-1} className="type-h3 mt-6 outline-none">
          {t.success.heading}
        </h3>
        <p className="mt-3 text-muted">
          {t.success.body}{" "}
          <TextLink
            href={site.contact.whatsappUrl}
            external
            arrow="external"
            className="text-paper-50"
          >
            {t.success.whatsapp}
          </TextLink>
        </p>
      </div>
    );
  }

  const f = t.fields;
  const describedBy = (name: FieldName, hint?: boolean) =>
    cn(hint && `hint-${name}`, errors[name] && `error-${name}`) || undefined;

  return (
    <>
      <noscript>
        <p className="mb-6 border border-line p-4">
          {t.noscript}{" "}
          <a className="link" href={site.contact.whatsappUrl}>
            {t.error.whatsapp}
          </a>{" "}
          ·{" "}
          <a className="link" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
        </p>
      </noscript>
      <form
        ref={formRef}
        noValidate
        onSubmit={onSubmit}
        aria-busy={status === "submitting"}
        aria-labelledby="contact-title"
        className="flex flex-col gap-6"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="name" label={f.name.label} error={errors.name}>
            <input
              id="field-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              onChange={onChange}
              aria-invalid={!!errors.name}
              aria-describedby={describedBy("name")}
              className="field"
            />
          </Field>
          <Field id="business" label={f.business.label} optional={f.business.optional}>
            <input
              id="field-business"
              name="business"
              type="text"
              autoComplete="organization"
              onChange={onChange}
              className="field"
            />
          </Field>
          <Field id="phone" label={f.phone.label} hint={f.phone.hint} error={errors.phone}>
            <input
              id="field-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              onChange={onChange}
              aria-invalid={!!errors.phone}
              aria-describedby={describedBy("phone", true)}
              className="field"
            />
          </Field>
          <Field id="email" label={f.email.label} optional={f.email.optional} error={errors.email}>
            <input
              id="field-email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={onChange}
              aria-invalid={!!errors.email}
              aria-describedby={describedBy("email")}
              className="field"
            />
          </Field>
        </div>

        <fieldset
          className="chip-group"
          aria-invalid={!!errors.service}
          aria-describedby={describedBy("service")}
        >
          <legend className="type-small mb-2 font-medium">{f.service.legend}</legend>
          <div className="flex flex-wrap gap-2">
            {f.service.options.map((o) => (
              <label key={o.value} className="chip">
                <input type="radio" name="service" value={o.value} onChange={onChange} required />
                <span className="type-small">{o.label}</span>
              </label>
            ))}
          </div>
          {errors.service && <ErrorText id="error-service">{errors.service}</ErrorText>}
        </fieldset>

        <Field id="message" label={f.message.label} optional={f.message.optional}>
          <textarea
            id="field-message"
            name="message"
            rows={4}
            maxLength={f.message.max}
            onChange={onChange}
            className="field resize-y"
          />
        </Field>

        {/* Web3Forms spam trap: hidden from people and assistive tech */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          className="hidden"
        />

        {status === "error" && (
          <p role="alert" className="state-in border border-[var(--error)] p-4 type-small">
            {t.error.lead}{" "}
            <TextLink href={site.contact.whatsappUrl} external arrow="external">
              {t.error.whatsapp}
            </TextLink>{" "}
            /{" "}
            <TextLink href={`mailto:${site.contact.email}`} arrow="external">
              {t.error.email}
            </TextLink>
            .
          </p>
        )}

        <div>
          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto"
            disabled={status === "submitting"}
            aria-busy={status === "submitting"}
          >
            <span>{status === "submitting" ? t.submitting : t.submit}</span>
            <ArrowIcon className="btn-arrow" />
          </button>
          <p className="type-small mt-3 text-muted">{t.privacy}</p>
        </div>
      </form>
    </>
  );
}

function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: FieldName;
  label: string;
  optional?: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={`field-${id}`} className="type-small mb-2 font-medium">
        {label}
        {optional && <span className="ml-2 font-normal text-muted">{optional}</span>}
      </label>
      {children}
      {hint && (
        <p id={`hint-${id}`} className="type-small mt-2 text-muted">
          {hint}
        </p>
      )}
      {error && <ErrorText id={`error-${id}`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="type-small mt-2 text-[var(--error)]">
      {children}
    </p>
  );
}
