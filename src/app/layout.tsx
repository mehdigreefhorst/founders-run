import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bungee_Inline, Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

/**
 * Google Analytics 4. Set NEXT_PUBLIC_GA_ID in .env.local (and in
 * Vercel env vars for production). When unset, the script is not
 * injected — keeps dev sessions out of the production stream and
 * avoids loading gtag.js until you actually have an ID.
 *
 * The "NEXT_PUBLIC_" prefix is required so the value is available
 * to the client-side bundle.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const bungeeInline = Bungee_Inline({
  variable: "--font-varsity",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Founders Run Eindhoven — Wake early. Run together. Build something.",
  description:
    "Every Wednesday at 07:00, founders in Eindhoven meet to run, talk and build. Inspired by the founders run in San Francisco.",
  metadataBase: new URL("https://foundersrun.nl"),
  openGraph: {
    title: "Founders Run Eindhoven",
    description: "Wake early. Run together. Build something.",
    url: "https://foundersrun.nl",
    siteName: "Founders Run Eindhoven",
    locale: "en_GB",
    type: "website",
  },
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} ${bungeeInline.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Analytics />
        {children}
        <Toaster richColors closeButton position="top-center" />
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}
