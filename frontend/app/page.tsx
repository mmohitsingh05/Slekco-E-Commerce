import { BestSellersRow } from "@/components/home/BestSellersRow";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { FeaturedRow } from "@/components/home/FeaturedRow";
import { Hero } from "@/components/home/Hero";
import { NewArrivalsRow } from "@/components/home/NewArrivalsRow";
import { ValueProps } from "@/components/home/ValueProps";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryStrip />
      <BestSellersRow />
      <NewArrivalsRow />
      <FeaturedRow />
    </>
  );
}