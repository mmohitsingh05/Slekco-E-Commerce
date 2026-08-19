export const site = {
  name: "Slekco",
  tagline: "Everyday objects, considered.",
  description:
    "Slekco is a curated modern lifestyle store — electronics & audio, home & living, accessories and beauty & care.",

  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
  apiVersion: "v1",

  /** Static site navigation. Category links are populated from the API. */
  nav: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: "Collections", href: "/#categories" },
  ] as const,
} as const;

export const apiUrl = (path: string): string =>
  `${site.apiBaseUrl}/api/${site.apiVersion}${path}`;
