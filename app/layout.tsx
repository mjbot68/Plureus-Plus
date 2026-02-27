import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://chooseyourchoice.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "chooseyourchoice — Share your view",
    template: "%s | chooseyourchoice",
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "192x192" }, { url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "chooseyourchoice",
    title: "chooseyourchoice — Share your view",
    description:
      "Quick, anonymous feedback on short statements. No login required. Share your view in a few steps.",
    images: [{ url: "/icon.png", width: 192, height: 192, alt: "chooseyourchoice" }],
  },
  description:
    "Quick, anonymous feedback on short statements. No login, no email. Share your view in a few steps with agreement and intensity sliders.",
  keywords: [
    "anonymous feedback",
    "pulse survey",
    "share your view",
    "quick survey",
    "anonymous survey",
    "opinion poll",
    "feedback tool",
    "no login survey",
  ],
  authors: [{ name: "chooseyourchoice" }],
  creator: "chooseyourchoice",
  twitter: {
    card: "summary_large_image",
    title: "chooseyourchoice — Share your view",
    description:
      "Quick, anonymous feedback. No login. Share your view in a few steps.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col text-neutral-800" suppressHydrationWarning>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 sm:py-12">
          {children}
        </main>
        <footer className="shrink-0 border-t border-neutral-100 bg-white">
          <div className="mx-auto max-w-2xl px-4 py-3 sm:py-4">
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-neutral-400" aria-label="Footer">
              <Link href="/about" className="hover:text-neutral-600 transition-colors rounded py-0.5 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2">
                About
              </Link>
              <Link href="/privacy" className="hover:text-neutral-600 transition-colors rounded py-0.5 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2">
                Privacy
              </Link>
            </nav>
            <p className="mt-2 text-center text-[9px] text-neutral-400">
              Your responses are anonymous. © {new Date().getFullYear()} chooseyourchoice.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
