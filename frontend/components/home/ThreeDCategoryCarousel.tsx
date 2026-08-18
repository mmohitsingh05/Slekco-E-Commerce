"use client";

import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from "motion/react";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";

export interface CarouselCard {
  slug: string;
  name: string;
  image: string;
  productCount?: number;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useMediaQuery(query: string, defaultValue = false): boolean {
  const getMatches = () =>
    typeof window === "undefined" ? defaultValue : window.matchMedia(query).matches;
  const [matches, setMatches] = useState<boolean>(getMatches);

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    setMatches(matchMedia.matches);
    const handleChange = () => setMatches(matchMedia.matches);
    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

const transition = { duration: 0.15, ease: [0.32, 0.72, 0, 1] as const, filter: "blur(4px)" };
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const };

const Carousel = memo(function Carousel({
  cards,
  controls,
  isCarouselActive,
  onCardClick,
}: {
  cards: CarouselCard[];
  controls: ReturnType<typeof useAnimationControls>;
  isCarouselActive: boolean;
  onCardClick: (card: CarouselCard) => void;
}) {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = cards.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`);

  return (
    <div
      className="flex h-full items-center justify-center bg-canvas"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <motion.div
        drag={isCarouselActive ? "x" : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{
          transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        onDrag={(_, info) =>
          isCarouselActive && rotation.set(rotation.get() + info.offset.x * 0.05)
        }
        onDragEnd={(_, info) =>
          isCarouselActive &&
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.05,
            transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
          })
        }
        animate={controls}
      >
        {cards.map((card, i) => (
          <motion.div
            key={`card-${card.slug}`}
            className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-canvas p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
            onClick={() => onCardClick(card)}
          >
            <motion.img
              src={card.image}
              alt={card.name}
              layoutId={`img-${card.slug}`}
              className="pointer-events-none aspect-square w-full rounded-xl object-cover"
              initial={{ filter: "blur(4px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={transition}
            />
            <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-md bg-surface/85 px-3 py-1.5 text-center backdrop-blur-sm">
              <p className="text-body-sm font-medium text-ink">{card.name}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

export function ThreeDCategoryCarousel({ cards }: { cards: CarouselCard[] }) {
  const [activeCard, setActiveCard] = useState<CarouselCard | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimationControls();

  const handleCardClick = (card: CarouselCard) => {
    setActiveCard(card);
    setIsCarouselActive(false);
    controls.stop();
  };

  const handleClose = () => {
    setActiveCard(null);
    setIsCarouselActive(true);
  };

  useEffect(() => {
    if (!activeCard) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeCard]);

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionOverlay}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={activeCard.name}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4"
            style={{ willChange: "opacity" }}
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              className="flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-surface shadow-drawer"
            >
              <div className="relative aspect-square overflow-hidden">
                <motion.img
                  src={activeCard.image}
                  alt={activeCard.name}
                  layoutId={`img-${activeCard.slug}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-h3 font-semibold text-ink">{activeCard.name}</p>
                  {activeCard.productCount !== undefined && (
                    <p className="mt-1 text-body-sm text-ink-faint">
                      {activeCard.productCount} products
                    </p>
                  )}
                </div>
                <Link
                  href={`/categories/${activeCard.slug}`}
                  className="shrink-0 rounded-md bg-accent px-5 py-2.5 text-body-sm font-medium text-surface transition-colors hover:bg-accent-hover"
                >
                  Shop now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[480px] w-full overflow-hidden">
        <Carousel
          cards={cards}
          controls={controls}
          isCarouselActive={isCarouselActive}
          onCardClick={handleCardClick}
        />
      </div>
    </motion.div>
  );
}