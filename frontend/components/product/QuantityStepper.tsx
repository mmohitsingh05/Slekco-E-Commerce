"use client";

export function QuantityStepper({
  qty,
  onChange,
  max = 99,
}: {
  qty: number;
  onChange: (qty: number) => void;
  max?: number;
}) {
  return (
    <div
      className="inline-flex h-10 items-center rounded-md border border-border sm:h-11"
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, qty - 1))}
        disabled={qty <= 1}
        aria-label="Decrease quantity"
        className="flex h-full w-9 items-center justify-center text-ink transition-colors hover:bg-canvas disabled:opacity-40 sm:w-10"
      >
        −
      </button>
      <span className="w-9 text-center text-sm font-medium text-ink sm:w-10 sm:text-body" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, qty + 1))}
        disabled={qty >= max}
        aria-label="Increase quantity"
        className="flex h-full w-9 items-center justify-center text-ink transition-colors hover:bg-canvas disabled:opacity-40 sm:w-10"
      >
        +
      </button>
    </div>
  );
}
