import { content, type TrustIcon } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { CheckIcon, HeadsetIcon, RotateIcon, ShieldIcon, TruckIcon } from "@/components/ui/icons";

const icons: Record<TrustIcon, typeof TruckIcon> = {
  truck: TruckIcon,
  rotate: RotateIcon,
  shield: ShieldIcon,
  headset: HeadsetIcon,
  check: CheckIcon,
};

export function ValueProps() {
  return (
    <section aria-label="Why shop with us" className="border-y border-border bg-surface">
      <Container className="grid grid-cols-2 gap-4 py-5 sm:gap-6 sm:py-6 md:grid-cols-4">
        {content.trust.map((value) => {
          const Icon = icons[value.icon];
          return (
            <div key={value.title} className="flex items-center justify-center gap-3 md:justify-start">
              <Icon className="h-5 w-5 shrink-0 text-ink" />
              <div className="min-w-0">
                <h4 className="text-xs font-bold uppercase tracking-wide text-ink">{value.title}</h4>
                <p className="text-xs text-ink-faint">{value.description}</p>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
