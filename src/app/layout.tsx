import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RSR Concept Store | Moda & Estilo",
  description: "Loja especializada em moda fitness, wearables, malhas, moletons e acessórios em couro. Qualidade premium e design exclusivo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${cormorant.variable} ${josefin.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}