import { CheckIcon, RotateIcon, ShieldIcon, TruckIcon } from "@/components/ui/icons";
import { content, type TrustIcon } from "@/lib/content";

const ICONS: Record<TrustIcon, typeof TruckIcon> = {
  truck: TruckIcon,
  rotate: RotateIcon,
  shield: ShieldIcon,
  check: CheckIcon,
};

export function TrustStrip() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {content.trust.slice(0, 3).map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <li
            key={item.title}
            className="flex items-center gap-2 text-body-sm text-ink-soft"
            title={item.description}
          >
            <Icon className="h-4 w-4 shrink-0 text-accent" />
            {item.title}
          </li>
        );
      })}
    </ul>
  );
}