import { Container } from "@/components/ui/Container";

const values = [
  {
    title: "Free shipping",
    description: "Free delivery on all orders above ₹999.",
  },
  {
    title: "Easy returns",
    description: "30-day returns, no questions asked.",
  },
  {
    title: "Considered quality",
    description: "Every product is tested and hand-picked.",
  },
];

export function ValueProps() {
  return (
    <section aria-label="Why shop with us" className="border-t border-border">
      <Container className="grid gap-6 py-10 md:grid-cols-3 md:py-12">
        {values.map((value) => (
          <div key={value.title} className="flex flex-col gap-1">
            <h3 className="text-h3 font-medium text-ink">{value.title}</h3>
            <p className="text-body-sm text-ink-soft">{value.description}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}