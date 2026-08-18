import { content, type TrustIcon } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { CheckIcon, RotateIcon, ShieldIcon, TruckIcon } from "@/components/ui/icons";

const icons: Record<TrustIcon, typeof TruckIcon> = {
  truck: TruckIcon,
  rotate: RotateIcon,
  shield: ShieldIcon,
  check: CheckIcon,
};

export function ValueProps() {
  return (
    <section aria-label="Why shop with us" className="border-b border-border">
      <Container className="grid gap-6 py-10 sm:grid-cols-2 md:grid-cols-4 md:py-12">
        {content.trust.map((value) => {
          const Icon = icons[value.icon];
          return (
            <div key={value.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
                <Icon />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-h3 font-medium text-ink">{value.title}</h3>
                <p className="text-body-sm text-ink-soft">{value.description}</p>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}