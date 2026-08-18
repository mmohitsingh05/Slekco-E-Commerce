import { Container } from "@/components/ui/Container";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <Container className="py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-6">
        <div className="h-8 w-32 animate-pulse rounded-md bg-border/60" />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="h-11 w-full max-w-sm animate-pulse rounded-md bg-border/60" />
          <div className="h-11 w-40 animate-pulse rounded-md bg-border/60" />
        </div>
      </div>
      <ProductGridSkeleton />
    </Container>
  );
}