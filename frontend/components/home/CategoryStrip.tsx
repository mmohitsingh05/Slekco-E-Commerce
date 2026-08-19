import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BagIcon, DumbbellIcon, HeadphonesIcon, LampIcon, PenIcon, SparklesIcon } from "@/components/ui/icons";

const categoryIcons: Record<string, typeof HeadphonesIcon> = {
  "electronics-audio": HeadphonesIcon,
  "home-living": LampIcon,
  "accessories": BagIcon,
  "beauty-care": SparklesIcon,
  "sports-fitness": DumbbellIcon,
  "stationery-office": PenIcon,
};

export async function CategoryStrip() {
  const categories = await getCategories();

  return (
    <section id="categories" aria-labelledby="categories-heading">
      <Container className="max-w-7xl mx-auto px-4 py-16">
        <h2
          id="categories-heading"
          className="text-center text-2xl font-black uppercase tracking-wider mb-8"
        >
          Shop by category
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.slug] ?? BagIcon;
            return (
              <Reveal key={category._id} delay={index * 80}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="group relative flex h-80 items-end overflow-hidden bg-gray-100 p-4"
                  aria-label={category.name}
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10 w-full text-center text-white">
                    <Icon className="mb-1 block h-6 w-6 mx-auto" />
                    <h3 className="mb-1 text-sm font-bold uppercase tracking-wider">
                      {category.name}
                    </h3>
                    <span className="text-xs font-semibold underline hover:text-brand-yellow transition-colors">
                      Shop now
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
