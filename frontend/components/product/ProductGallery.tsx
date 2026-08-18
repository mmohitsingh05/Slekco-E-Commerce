"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : [images[0]].filter(Boolean);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-surface shadow-card">
        <Image
          src={gallery[active]}
          alt={`${name} — image ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="object-cover"
        />
      </div>
      {gallery.length > 1 && (
        <div className="flex gap-3" role="tablist" aria-label="Product images">
          {gallery.map((src, index) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`Show image ${index + 1}`}
              onClick={() => setActive(index)}
              className={`relative aspect-square w-20 overflow-hidden rounded-md border bg-surface transition-colors ${
                active === index ? "border-accent" : "border-border hover:border-ink-faint"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}