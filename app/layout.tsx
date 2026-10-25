import type { Metadata } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { dictionaries } from "@/lib/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", weight: ["500", "600"], display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-instrument", weight: "400", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.far-it.com"),
  title: dictionaries.fr.meta.title,
  description: dictionaries.fr.meta.description,
  icons: { icon: "/icon.png" },
  openGraph: {
    title: dictionaries.fr.meta.title,
    description: dictionaries.fr.meta.description,
    images: ["/images/hero.jpg"],
    locale: "fr_FR",
    alternateLocale: ["en_GB"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${interTight.variable} ${instrument.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
