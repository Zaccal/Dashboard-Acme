import { Inter, Lusitana } from "next/font/google";

export const PrimaryFont = Inter({
  subsets: ["latin"],
});

// TODO: Create a fallback font and implement this font to p in app/page.tsx
export const SecondaryFont = Lusitana({
  subsets: ["latin"],
  weight: "700",
  fallback: ["Arial"],
});
