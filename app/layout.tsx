import "@/app/global.css";
import {PrimaryFont} from "./ui/font";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Acme Dashboard",
    description: "The official Next.js Course Dashboard, built with App Router.",
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh')
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${PrimaryFont.className} antialiased`}>{children}</body>
        </html>
    );
}
