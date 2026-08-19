import Link from "next/link";
import { site } from "@/lib/site";
import { content } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, TiktokIcon, YoutubeIcon, XIcon } from "@/components/ui/icons";

const socialIcons = {
  Instagram: InstagramIcon,
  TikTok: TiktokIcon,
  YouTube: YoutubeIcon,
  X: XIcon,
} as const;

export function Footer() {
  const year = new Date().getFullYear();
  const f = content.footer;

  return (
    <footer className="relative border-t border-white/10 bg-brand-dark pt-12 pb-6 text-xs text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
      <Container className="relative max-w-7xl mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Col 1: Bio & Social */}
          <div className="md:col-span-2 pr-6">
            <Link
              href="/"
              className="mb-3 block text-2xl font-black italic tracking-tighter"
              aria-label={`${site.name} home`}
            >
              {site.name}
            </Link>
            <p className="mb-4 max-w-sm leading-relaxed text-white/50">
              {f.blurb}
            </p>
            <div className="flex space-x-4 text-base text-white/40">
              {f.social.map((s) => {
                const Icon = socialIcons[s.label as keyof typeof socialIcons];
                return Icon ? (
                  <a key={s.label} href={s.href} className="hover:text-white transition-colors" aria-label={s.label}>
                    <Icon className="h-5 w-5" />
                  </a>
                ) : null;
              })}
            </div>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h5 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/70">Shop</h5>
            <ul className="space-y-2 text-white/40">
              {f.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h5 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/70">Customer Care</h5>
            <ul className="space-y-2 text-white/40">
              {f.customerCare.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h5 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/70">Company</h5>
            <ul className="space-y-2 text-white/40">
              {f.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-white/40 sm:flex-row">
          <p>&copy; {year} {site.name}. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>EN / INR</span>
            <div className="flex space-x-3 text-sm text-white/30">
              {["VISA", "MC", "PayPal", "Pay"].map((p) => (
                <span key={p} className="rounded border border-white/15 px-2 py-0.5 text-[0.625rem] font-bold uppercase">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
