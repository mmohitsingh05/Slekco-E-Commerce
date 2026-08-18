"use client";

import { useState } from "react";
import { content } from "@/lib/content";

const STORAGE_KEY = "slekco-newsletter";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [subscribed, setSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);

  if (!mounted && typeof window !== "undefined") {
    setMounted(true);
    setSubscribed(window.localStorage.getItem(STORAGE_KEY) === "1");
  }

  if (subscribed || status === "success") {
    return (
      <p className="text-body-sm text-success" role="status">
        {content.newsletter.success}
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-2"
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
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
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
          className="h-11 flex-1 rounded-md border border-border bg-canvas px-3 text-body text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          className="h-11 rounded-md bg-accent px-5 text-body-sm font-medium text-surface transition-colors hover:bg-accent-hover"
        >
          {content.newsletter.button}
        </button>
      </div>
      {status === "error" && (
        <p className="text-body-sm text-danger" role="alert">
          {content.newsletter.error}
        </p>
      )}
    </form>
  );
}