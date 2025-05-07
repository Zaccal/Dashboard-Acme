import { Inter, Lusitana } from "next/font/google";

export const PrimaryFont = Inter({
  subsets: ["latin"],
});

export const SecondaryFont = Lusitana({
  subsets: ["latin"],
  weight: "700",
  fallback: ["Arial"],
});
