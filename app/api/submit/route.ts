import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type AnswerEntry = { question_id: number; agreement: number; intensity: number };

type Body = {
  stack_id?: string;
  answers?: AnswerEntry[];
};

function validate(body: unknown): body is Body {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (typeof b.stack_id !== "string") return false;
  if (!Array.isArray(b.answers)) return false;
  for (const a of b.answers) {
    if (
      !a ||
      typeof a !== "object" ||
      typeof (a as AnswerEntry).question_id !== "number" ||
      typeof (a as AnswerEntry).agreement !== "number" ||
      typeof (a as AnswerEntry).intensity !== "number"
    )
      return false;
  }
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!validate(body)) {
      return NextResponse.json(
        { message: "Invalid payload: stack_id and answers required" },
        { status: 400 }
      );
    }
    const { stack_id, answers } = body;

    const { error } = await supabase.from("voting_responses").insert({
      stack_id,
      answers,
    });

    if (error) {
      return NextResponse.json(
        { message: error.message ?? "Database error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
