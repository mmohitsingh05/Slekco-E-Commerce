import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { NewArrivalsRow } from "@/components/home/NewArrivalsRow";
import { PromoStrip } from "@/components/home/PromoStrip";
import { NewsletterBand } from "@/components/layout/NewsletterBand";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryStrip />
      <NewArrivalsRow />
      <PromoStrip />
      <NewsletterBand />
    </>
  );
}
