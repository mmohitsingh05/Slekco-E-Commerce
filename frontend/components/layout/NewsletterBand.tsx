"use client";

import { useState } from "react";
import { content } from "@/lib/content";
import { MailIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";

const STORAGE_KEY = "slekco-newsletter";

export function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [subscribed, setSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);

  if (!mounted && typeof window !== "undefined") {
    setMounted(true);
    setSubscribed(window.localStorage.getItem(STORAGE_KEY) === "1");
  }

  return (
    <section className="border-t border-border bg-surface py-10">
      <Container className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white">
            <MailIcon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-wide text-ink">{content.newsletter.title}</h4>
            <p className="text-xs text-ink-faint">{content.newsletter.description}</p>
          </div>
        </div>

        {subscribed || status === "success" ? (
          <p className="text-xs font-bold text-success" role="status">
            {content.newsletter.success}
          </p>
        ) : (
          <div className="w-full max-w-md md:w-auto">
            <form
              className="flex"
              onSubmit={(event) => {
                event.preventDefault();
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  setStatus("error");
                  return;
                }
                if (typeof window !== "undefined") {
                  window.localStorage.setItem(STORAGE_KEY, "1");
                }
                setStatus("success");
              }}
            >
              <label htmlFor="newsletter-band-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-band-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder={content.newsletter.placeholder}
                aria-invalid={status === "error"}
                className="min-w-0 flex-1 border border-r-0 border-border bg-canvas px-4 py-2.5 text-xs text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-brand-dark px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink"
              >
                {content.newsletter.button}
              </button>
            </form>
            {status === "error" && (
              <p className="mt-1.5 text-[11px] text-danger" role="alert">
                {content.newsletter.error}
              </p>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
