import "@/app/global.css";
import { PrimaryFont } from "./ui/font";

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
