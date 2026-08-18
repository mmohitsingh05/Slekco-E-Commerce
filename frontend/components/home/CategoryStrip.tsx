import Link from "next/link";
import { getCategories } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { ThreeDCategoryCarousel } from "@/components/home/ThreeDCategoryCarousel";

export async function CategoryStrip() {
  const categories = await getCategories();

  return (
    <section id="categories" aria-labelledby="categories-heading">
      <Container className="py-12 md:py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="categories-heading" className="text-h2 font-semibold tracking-tight text-ink">
            Shop by category
          </h2>
          <Link
            href="/products"
            className="text-body-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            View all
          </Link>
        </div>

        <ThreeDCategoryCarousel
          cards={categories.map((category) => ({
            slug: category.slug,
            name: category.name,
            image: category.image,
            productCount: category.productCount,
          }))}
        />
      </Container>
    </section>
  );
}