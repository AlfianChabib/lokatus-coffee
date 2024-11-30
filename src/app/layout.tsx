import type { Metadata } from "next";
import { Inter, Bellefair, Montserrat } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import TanstackProviders from "@/components/providers/TanstackProvider";
import "./globals.css";
import { Toaster } from "sonner";
import Favicon from "/public/metadata/favicon.ico";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
  adjustFontFallback: false,
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  preload: false,
  adjustFontFallback: false,
});

const bellefair = Bellefair({
  weight: ["400"],
  subsets: ["hebrew"],
  display: "swap",
  variable: "--font-bellefair",
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Lokatus Coffee",
  description: "Lokatus Coffee is a coffee shop that provides coffee and tea to customers.",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${bellefair.variable} ${montserrat.variable} antialiased`}
      >
        <NuqsAdapter>
          <TanstackProviders>{children}</TanstackProviders>
          <Toaster richColors />
        </NuqsAdapter>
      </body>
    </html>
  );
}
