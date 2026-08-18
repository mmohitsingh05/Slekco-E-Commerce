import type { Metadata } from "next";
import { getCategories, getProducts } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/shop/EmptyState";
import { FilterBar } from "@/components/shop/FilterBar";
import { Pagination } from "@/components/shop/Pagination";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SearchBar } from "@/components/shop/SearchBar";
import { SortSelect } from "@/components/shop/SortSelect";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse the full Slekco collection — search, filter and sort across all categories.",
};

const VALID_SORTS = new Set(["featured", "price_asc", "price_desc", "newest", "rating"]);

const toNumber = (value: string | string[] | undefined): number | undefined => {
  const raw = typeof value === "string" ? value : undefined;
  if (raw === undefined || raw === "") return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const first = (value: string | string[] | undefined) =>
    typeof value === "string" ? value : undefined;

  const q = first(params.q)?.trim() ?? undefined;
  const category = first(params.category) ?? undefined;
  const brand = first(params.brand) ?? undefined;
  const minPrice = toNumber(params.minPrice);
  const maxPrice = toNumber(params.maxPrice);
  const rawSort = first(params.sort) ?? "featured";
  const sort = VALID_SORTS.has(rawSort)
    ? (rawSort as "featured" | "price_asc" | "price_desc" | "newest" | "rating")
    : "featured";
  const rawPage = Number(first(params.page) ?? "1");
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;

  const [categories, result, allProducts] = await Promise.all([
    getCategories(),
    getProducts({ q, category, brand, minPrice, maxPrice, sort, page, limit: 12 }),
    getProducts({ limit: 50 }),
  ]);

  const brands = Array.from(new Set(allProducts.items.map((p) => p.brand))).sort((a, b) =>
    a.localeCompare(b),
  );

  const buildHref = (targetPage: number) => {
    const url = new URLSearchParams();
    if (q) url.set("q", q);
    if (category) url.set("category", category);
    if (brand) url.set("brand", brand);
    if (minPrice !== undefined) url.set("minPrice", String(minPrice));
    if (maxPrice !== undefined) url.set("maxPrice", String(maxPrice));
    if (sort !== "featured") url.set("sort", sort);
    if (targetPage > 1) url.set("page", String(targetPage));
    const query = url.toString();
    return query ? `/products?${query}` : "/products";
  };

  return (
    <Container className="py-8 md:py-12">
      <header className="mb-8 flex flex-col gap-6">
        <h1 className="text-h1 font-semibold tracking-tight text-ink">Shop</h1>
        <SearchBar />
      </header>

      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <FilterBar categories={categories} brands={brands} />
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-body-sm text-ink-faint" role="status">
              {result.total} {result.total === 1 ? "product" : "products"}
              {q && <> for &ldquo;{q}&rdquo;</>}
            </p>
            <SortSelect />
          </div>

          {result.items.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <ProductGrid products={result.items} />
              <Pagination page={result.page} pages={result.pages} buildHref={buildHref} />
            </>
          )}
        </div>
      </div>
    </Container>
  );
}