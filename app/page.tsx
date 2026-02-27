"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { ACTIVE_STACK, type AnswerEntry } from "@/lib/content";

const SLIDER_MIN = 0;
const SLIDER_MAX = 100;
const RESPONSE_COUNT = "1,284";
const MOCK_ALIGNMENT_PERCENT = 73;
const MOCK_TOP_INTENSITY_PERCENT = 28;

function getPositionLabel(avgAgreement: number): string {
  if (avgAgreement < 40) return "Disagree";
  if (avgAgreement <= 60) return "Mixed";
  return "Agree";
}

function getIntensityLabel(avgIntensity: number): string {
  if (avgIntensity < 40) return "Low";
  if (avgIntensity <= 60) return "Medium";
  return "High";
}

export default function VotingPage() {
  const { stack_id, statements } = ACTIVE_STACK;
  const totalSteps = statements.length;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(AnswerEntry | null)[]>(
    Array(totalSteps).fill(null)
  );
  const [touched, setTouched] = useState({ agreement: false, intensity: false });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copyLinkCopied, setCopyLinkCopied] = useState(false);
  const [shareResultCopied, setShareResultCopied] = useState(false);

  const isCompletionStep = step >= totalSteps;
  const currentStatement = statements[step];
  const defaultAnswer: AnswerEntry = currentStatement
    ? { question_id: currentStatement.id, agreement: 50, intensity: 50 }
    : { question_id: 0, agreement: 50, intensity: 50 };
  const currentAnswer = answers[step] ?? defaultAnswer;
  const agreement = currentAnswer?.agreement ?? 50;
  const intensity = currentAnswer?.intensity ?? 50;
  const canAdvance = touched.agreement && touched.intensity;

  const setAgreement = useCallback(
    (value: number) => {
      setTouched((t) => ({ ...t, agreement: true }));
      setAnswers((prev) => {
        const next = [...prev];
        const current = next[step];
        const st = statements[step];
        next[step] = {
          question_id: st?.id ?? 0,
          agreement: value,
          intensity: current?.intensity ?? 50,
        };
        return next;
      });
    },
    [step, statements]
  );

  const setIntensity = useCallback(
    (value: number) => {
      setTouched((t) => ({ ...t, intensity: true }));
      setAnswers((prev) => {
        const next = [...prev];
        const current = next[step];
        const st = statements[step];
        next[step] = {
          question_id: st?.id ?? 0,
          agreement: current?.agreement ?? 50,
          intensity: value,
        };
        return next;
      });
    },
    [step, statements]
  );

  const goNext = useCallback(() => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
      setTouched({ agreement: false, intensity: false });
    } else {
      setStep(totalSteps);
    }
  }, [step, totalSteps]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    const validAnswers: AnswerEntry[] = [];
    for (let i = 0; i < totalSteps; i++) {
      const a = answers[i];
      const st = statements[i];
      if (a != null && st && typeof a.agreement === "number" && typeof a.intensity === "number") {
        validAnswers.push({
          question_id: st.id,
          agreement: a.agreement,
          intensity: a.intensity,
        });
      }
    }
    const payload = {
      stack_id,
      answers: validAnswers,
    };
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? "Failed to submit");
      }
      setSubmitted(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }, [stack_id, answers, statements, totalSteps, submitting]);

  const voteAgain = useCallback(() => {
    setStep(0);
    setAnswers(Array(totalSteps).fill(null));
    setTouched({ agreement: false, intensity: false });
    setSubmitted(false);
    setSubmitError(null);
    setCopyLinkCopied(false);
    setShareResultCopied(false);
  }, [totalSteps]);

  const copyLink = useCallback(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url).then(() => {
      setCopyLinkCopied(true);
      setTimeout(() => setCopyLinkCopied(false), 2000);
    });
  }, []);

  const validAnswers = answers.filter((a): a is AnswerEntry => a != null && typeof a.agreement === "number" && typeof a.intensity === "number");
  const avgAgreement = validAnswers.length > 0
    ? Math.round(validAnswers.reduce((s, a) => s + a.agreement, 0) / validAnswers.length)
    : 50;
  const avgIntensity = validAnswers.length > 0
    ? Math.round(validAnswers.reduce((s, a) => s + a.intensity, 0) / validAnswers.length)
    : 50;
  const othersAgreementPlaceholder = 52;

  const shareResult = useCallback(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const msg = `I just shared my signal on Plureus — ${avgAgreement}% agreement. Add yours: ${url}`;
    navigator.clipboard.writeText(msg).then(() => {
      setShareResultCopied(true);
      setTimeout(() => setShareResultCopied(false), 2000);
    });
  }, [avgAgreement]);

  if (isCompletionStep) {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="card animate-fade-in">
            <div className="flex flex-col items-center text-center">
              {submitted ? (
                <>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 shadow-inner ring-2 ring-neutral-200/60">
                    <svg className="h-8 w-8 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
                    Thank you
                  </h2>
                  <p className="mt-3 max-w-sm text-neutral-600 leading-relaxed">
                    Your answers have been recorded.
                  </p>
                  <p className="mt-4 text-base font-medium text-neutral-800">
                    You are more aligned than {MOCK_ALIGNMENT_PERCENT}% of respondents.
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    You fall into the top {MOCK_TOP_INTENSITY_PERCENT}% of agreement intensity.
                  </p>
                  <div className="mt-8 w-full max-w-sm space-y-6 text-left">
                    <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Your position</p>
                      <p className="mt-1 text-lg font-medium text-neutral-900">{getPositionLabel(avgAgreement)}</p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Your intensity</p>
                      <p className="mt-1 text-lg font-medium text-neutral-900">{getIntensityLabel(avgIntensity)}</p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 px-4 py-3 space-y-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">You vs others</p>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs text-neutral-600 mb-1.5">
                            <span className="font-medium">You</span>
                            <span className="font-semibold tabular-nums text-neutral-800">{avgAgreement}%</span>
                          </div>
                          <div className="h-4 w-full overflow-hidden rounded-full bg-neutral-200">
                            <div className="h-full rounded-full bg-indigo-600 transition-[width] duration-300" style={{ width: `${avgAgreement}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-neutral-600 mb-1.5">
                            <span className="font-medium">Others</span>
                            <span className="font-semibold tabular-nums text-neutral-600">{othersAgreementPlaceholder}%</span>
                          </div>
                          <div className="h-4 w-full overflow-hidden rounded-full bg-neutral-200">
                            <div className="h-full rounded-full bg-amber-500/80 transition-[width] duration-300" style={{ width: `${othersAgreementPlaceholder}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:flex-wrap">
                    <button
                      type="button"
                      onClick={shareResult}
                      className="min-h-[44px] rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
                    >
                      {shareResultCopied ? "Copied!" : "Share your result"}
                    </button>
                    <button
                      type="button"
                      onClick={copyLink}
                      className="min-h-[44px] rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
                    >
                      {copyLinkCopied ? "Link copied!" : "Copy link"}
                    </button>
                    <button
                      type="button"
                      onClick={voteAgain}
                      className="btn-primary w-full sm:w-auto"
                    >
                      Vote again
                    </button>
                  </div>
                  <p className="mt-6 text-xs text-neutral-500">
                    More signals coming soon
                  </p>
                </>
              ) : (
                <>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 shadow-inner">
                    <svg className="h-6 w-6 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
                    Ready to submit
                  </h2>
                  <p className="mt-3 max-w-sm text-neutral-600 leading-relaxed">
                    Please click below to submit your responses.
                  </p>
                  <div className="mt-8 w-full max-w-xs">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="btn-primary w-full"
                    >
                      {submitting ? "Submitting…" : "Submit responses"}
                    </button>
                    {submitError && (
                      <p className="mt-4 text-sm text-red-600">{submitError}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <p className="mt-4 text-center text-[9px] text-neutral-400">
            <Link href="/privacy" className="hover:text-neutral-500 transition-colors">Privacy</Link>
            <span className="mx-1.5">·</span>
            <span>{RESPONSE_COUNT} responses collected</span>
          </p>
          <p className="mt-2 text-center text-[10px] text-neutral-400">
            Part of an ongoing signal tracking system
          </p>
        </div>
      </div>
    );
  }

  const statement = statements[step];
  const progressPercent = totalSteps > 0 ? ((step + 1) / totalSteps) * 100 : 0;

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="card">
          <p className="mb-4 text-sm text-neutral-600">
            Move both sliders to reflect your position and how strongly you feel.
          </p>
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
              Plureus Signal — Stack 001
            </h1>
            <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
              Anonymous. Aggregated. No personal data collected.
            </p>
            <p className="mt-2 text-[11px] text-neutral-400">
              Part of an ongoing signal tracking system
            </p>
          </div>
          <p className="mb-4 text-center text-[11px] text-neutral-500">
            {RESPONSE_COUNT} responses collected
          </p>
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="rounded-full bg-neutral-100 px-3.5 py-1.5 text-sm font-medium text-neutral-700 shadow-sm">
              Question {step + 1} of {totalSteps}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 flex-1 min-w-[24px] max-w-10 rounded-full transition-colors duration-200 ${i <= step ? "bg-neutral-700 shadow-sm" : "bg-neutral-200"
                    }`}
                />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-medium text-neutral-500">Progress</span>
              <span className="text-xs font-semibold tabular-nums text-neutral-700">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 shadow-inner">
              <div
                className="h-full rounded-full bg-neutral-600 transition-[width] duration-300 ease-out shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div key={step} className="animate-fade-in">
            <p className="mb-1 text-lg leading-relaxed text-neutral-900 sm:text-xl">
              {statement.text}
            </p>
            <div className="mb-6" />

          <div className="space-y-6 sm:space-y-8">
            <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/80 p-4 shadow-sm sm:p-5">
              <p className="mb-3 flex justify-between text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-sm">
                <span>Strongly disagree</span>
                <span>Strongly agree</span>
              </p>
              <div className="relative flex items-center gap-3">
                <input
                  type="range"
                  min={SLIDER_MIN}
                  max={SLIDER_MAX}
                  value={agreement ?? 50}
                  onChange={(e) => setAgreement(Number(e.target.value))}
                  className="slider-gradient w-full cursor-pointer flex-1"
                  aria-label="Agreement"
                />
                <span className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-md bg-neutral-700 px-2 text-sm font-semibold tabular-nums text-white shadow-sm">
                  {agreement ?? 50}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/80 p-4 shadow-sm sm:p-5">
              <p className="mb-3 text-xs font-medium text-neutral-600 sm:text-sm">
                How strongly do you feel?
              </p>
              <p className="mb-3 flex justify-between text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-sm">
                <span>Not strongly</span>
                <span>Very strongly</span>
              </p>
              <div className="relative flex items-center gap-3">
                <input
                  type="range"
                  min={SLIDER_MIN}
                  max={SLIDER_MAX}
                  value={intensity ?? 50}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="slider-gradient w-full cursor-pointer flex-1"
                  aria-label="How strongly you feel"
                />
                <span className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-md bg-neutral-700 px-2 text-sm font-semibold tabular-nums text-white shadow-sm">
                  {intensity ?? 50}
                </span>
              </div>
            </div>
          </div>
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={goNext}
              disabled={!canAdvance}
              className="btn-primary w-full"
            >
              Next
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-[9px] text-neutral-400">
          <Link href="/privacy" className="hover:text-neutral-500 transition-colors">Privacy</Link>
          <span className="mx-1.5">·</span>
          <span>{RESPONSE_COUNT} responses collected</span>
        </p>
        <p className="mt-2 text-center text-[10px] text-neutral-400">
          Part of an ongoing signal tracking system
        </p>
      </div>
    </div>
  );
}
