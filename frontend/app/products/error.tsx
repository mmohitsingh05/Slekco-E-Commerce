"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function ProductsError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <Container className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-h2 font-semibold text-ink">Something went wrong</p>
      <p className="max-w-sm text-body text-ink-soft">
        We couldn&apos;t load the products. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </Container>
  );
}