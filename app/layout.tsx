import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/lib/providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppFab from "@/components/whatsapp";
import { inter, jakarta } from "./fonts";

export const metadata: Metadata = {
  title: { default: "Decimal Builders", template: "%s • Decimal Builders" },
  description: "Decimal Builders – Residential & commercial construction.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Header />
          <main className="container-max py-8">{children}</main>
          <Footer />
          <WhatsAppFab />
        </Providers>
      </body>
    </html>
  );
}
