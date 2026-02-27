import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Pulse privacy: we only store timestamp, stack id, and answers. No name, email, or PII. Anonymous by design.",
  keywords: [
    "Pulse privacy",
    "anonymous survey",
    "no personal data",
    "privacy policy",
    "data we collect",
  ],
  openGraph: {
    title: "Privacy | Pulse",
    description:
      "We store only your answers and timestamp. No name, email, or identifying information. Anonymous by design.",
    url: "/privacy",
  },
  twitter: {
    card: "summary",
    title: "Privacy | Pulse",
    description: "No PII, no tracking. Only anonymous answers and timestamp.",
  },
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-2xl">
      <div className="card">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Privacy
        </h1>
        <p className="mt-2 text-neutral-600 sm:text-lg">
          We keep it simple: no personal data, no tracking.
        </p>

        <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
          <section className="border-b border-neutral-100 pb-8 last:border-0 last:pb-0 sm:pb-10">
            <h2 className="text-lg font-semibold text-neutral-800 sm:text-xl">
              What we collect
            </h2>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base leading-relaxed">
              When you submit a response, we store only: the time of submission, the identifier of the question set (e.g. stack-001), and your answers (agreement and intensity values for each statement). We do not collect your name, email, IP address, or any other identifying information.
            </p>
          </section>

          <section className="border-b border-neutral-100 pb-8 last:border-0 last:pb-0 sm:pb-10">
            <h2 className="text-lg font-semibold text-neutral-800 sm:text-xl">
              Anonymous by design
            </h2>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base leading-relaxed">
              There is no login or account. We cannot link your responses to you. Your answers are used only in aggregate to understand how people feel about the topics—not to identify individuals.
            </p>
          </section>

          <section className="border-b border-neutral-100 pb-8 last:border-0 last:pb-0 sm:pb-10">
            <h2 className="text-lg font-semibold text-neutral-800 sm:text-xl">
              Data use
            </h2>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base leading-relaxed">
              Stored responses are used to analyze and improve the content and experience. We do not sell or share your data with third parties for marketing or advertising.
            </p>
          </section>
        </div>

        <div className="mt-8 sm:mt-10">
          <Link href="/" className="btn-primary inline-flex items-center justify-center">
            Back to Pulse
          </Link>
        </div>
      </div>
    </div>
  );
}
