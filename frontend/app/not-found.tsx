import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-label uppercase text-ink-faint">404</p>
      <h1 className="text-h1 font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="max-w-sm text-body text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center rounded-md bg-accent px-5 py-3 text-body-sm font-medium text-surface transition-colors hover:bg-accent-hover"
      >
        Back to home
      </Link>
    </Container>
  );
}