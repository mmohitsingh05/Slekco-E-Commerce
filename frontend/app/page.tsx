import { CategoryStrip } from "@/components/home/CategoryStrip";
import { FeaturedRow } from "@/components/home/FeaturedRow";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedRow />
      <ValueProps />
    </>
  );
}