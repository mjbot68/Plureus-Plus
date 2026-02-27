import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Pulse is a simple way to collect anonymous feedback on short statements. No login, no email. Fast and easy on mobile and desktop.",
  keywords: [
    "about Pulse",
    "anonymous feedback tool",
    "quick survey",
    "no login survey",
    "Pulse app",
  ],
  openGraph: {
    title: "About | Pulse",
    description:
      "Simple anonymous feedback on statements. No account, no PII. Built for speed and ease of use.",
    url: "/about",
  },
  twitter: {
    card: "summary",
    title: "About | Pulse",
    description: "What Pulse does: anonymous feedback in a few steps. No login.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-2xl">
      <div className="card">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          About Pulse
        </h1>
        <p className="mt-2 text-neutral-600 sm:text-lg">
          A simple way to collect anonymous feedback on short statements.
        </p>

        <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
          <section className="border-b border-neutral-100 pb-8 last:border-0 last:pb-0 sm:pb-10">
            <h2 className="text-lg font-semibold text-neutral-800 sm:text-xl">
              What it does
            </h2>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base leading-relaxed">
              Pulse shows you a set of statements, one at a time. For each one you rate how much you agree and how strongly you feel. At the end you submit your answers in one click. No account, no email, no sign-up. Your responses are stored anonymously so we can understand how people feel about the topics—not who said what.
            </p>
          </section>

          <section className="border-b border-neutral-100 pb-8 last:border-0 last:pb-0 sm:pb-10">
            <h2 className="text-lg font-semibold text-neutral-800 sm:text-xl">
              Who it’s for
            </h2>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base leading-relaxed">
              Anyone who wants to share their view quickly and safely. Pulse is built to be fast and easy on phones and desktops. The flow is the same every time: read, slide, next, submit.
            </p>
          </section>

          <section className="border-b border-neutral-100 pb-8 last:border-0 last:pb-0 sm:pb-10">
            <h2 className="text-lg font-semibold text-neutral-800 sm:text-xl">
              Your privacy
            </h2>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base leading-relaxed">
              We don’t ask for your name, email, or any identifying information. We only store your answers together with a timestamp and the set of questions you answered. For more detail, see our{" "}
              <Link href="/privacy" className="font-medium text-neutral-800 underline underline-offset-2 hover:text-neutral-600">
                Privacy
              </Link>{" "}
              page.
            </p>
          </section>
        </div>

        <div className="mt-8 sm:mt-10">
          <Link href="/" className="btn-primary inline-flex items-center justify-center">
            Start now
          </Link>
        </div>
      </div>
    </div>
  );
}
