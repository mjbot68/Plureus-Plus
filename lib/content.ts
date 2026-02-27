export type Statement = {
  id: number;
  text: string;
};

export type Stack = {
  stack_id: string;
  label: string;
  statements: Statement[];
};

export type AnswerEntry = {
  question_id: number;
  agreement: number;
  intensity: number;
};

export type SubmitPayload = {
  timestamp: string;
  stack_id: string;
  answers: AnswerEntry[];
};

import { STACK_001, ACTIVE_STACK } from "@/app/config/stacks";

export { STACK_001, ACTIVE_STACK };
