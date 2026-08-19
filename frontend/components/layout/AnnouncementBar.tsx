import { content } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { BellIcon, TruckIcon } from "@/components/ui/icons";
import Link from "next/link";

export function AnnouncementBar() {
  const zones = content.announcementZones;

  return (
    <div className="border-b border-white/10 bg-brand-dark text-white">
      <Container className="flex flex-col items-center gap-1 py-2 text-xs md:flex-row md:justify-between md:gap-0 md:space-y-0">
        {/* Left */}
        <div className="flex items-center space-x-2">
          <TruckIcon className="h-3.5 w-3.5" />
          <span className="font-bold">{zones.left}</span>
        </div>

        {/* Center */}
        <div className="flex items-center space-x-2">
          <BellIcon className="h-3.5 w-3.5" />
          <span>
            {zones.center}
            <strong className="text-brand-yellow">{zones.code}</strong>
          </span>
        </div>

        {/* Right */}
        <div className="flex space-x-4 text-white/50">
          <Link href={zones.right.href} className="transition-colors hover:text-white">
            {zones.right.label}
          </Link>
          <span>|</span>
          <Link href={zones.right.href2} className="transition-colors hover:text-white">
            {zones.right.label2}
          </Link>
        </div>
      </Container>
    </div>
  );
}
