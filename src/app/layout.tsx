import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fitlog-gym.vercel.app"),
  title: "FitLog — Train With Intent. Log Every Set.",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  keywords: [
    "fitness",
    "workout tracker",
    "gym log",
    "strength training",
    "bodybuilding",
    "exercise library",
    "FitLog",
  ],
  authors: [{ name: "Sumaya Jahan Othye" }],
  openGraph: {
    title: "FitLog — Workout Library & Daily Plan",
    description:
      "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
    siteName: "FitLog",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "FitLog Workout Library",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitLog — Train With Intent. Log Every Set.",
    description:
      "Pick a lift, lock it into today's plan, and watch the week's work add up.",
    images: ["/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} dark h-full`}>
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-[#ccff00] selection:text-[#09090b]">
        <PlanProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#121218",
                border: "1px solid #272736",
                color: "#f4f4f5",
                borderRadius: "12px",
                fontSize: "14px",
              },
              className: "font-sans",
            }}
            richColors
            closeButton
          />
        </PlanProvider>
      </body>
    </html>
  );
}
