import "@/app/global.css";
import { PrimaryFont } from "./ui/font";
import { Metadata } from "next";
import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Course Dashboard, built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
                                     children,
                                   }: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
    <body className={`${PrimaryFont.className} antialiased`}>
    <NextTopLoader/>
    {children}
    </body>
    </html>
  );
}
