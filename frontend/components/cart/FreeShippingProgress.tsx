"use client";

import { content } from "@/lib/content";
import { formatINR } from "@/lib/format";

export function FreeShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, content.freeShippingThreshold - subtotal);
  const percent = Math.min(
    100,
    Math.round((subtotal / content.freeShippingThreshold) * 100),
  );

  return (
    <div className="px-6 pb-4">
      {remaining > 0 ? (
        <p className="mb-2 text-body-sm text-ink-soft">
          You&apos;re <strong className="font-medium text-ink">{formatINR(remaining)}</strong>{" "}
          away from free shipping
        </p>
      ) : (
        <p className="mb-2 text-body-sm font-medium text-success">
          You&apos;ve unlocked free shipping on this order
        </p>
      )}
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-fast ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}