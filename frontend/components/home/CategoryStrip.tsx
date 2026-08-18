import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

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

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((category, index) => (
            <Reveal key={category._id} delay={index * 80}>
              <Link
                href={`/categories/${category.slug}`}
                className="group block"
                aria-label={category.name}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface shadow-card transition-shadow duration-base ease-out group-hover:shadow-card-hover">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-slow ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-overlay to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-h3 font-medium text-surface">{category.name}</p>
                    {category.productCount !== undefined && (
                      <p className="text-body-sm text-surface/80">
                        {category.productCount} products
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}