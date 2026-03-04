import { type Stack } from "@/lib/content";

/**
 * All "Stack" statements for the voting application.
 * Edit this file to change the text displayed in the app without digging through components.
 */

export const STACK_001: Stack = {
  stack_id: "stack-001",
  label: "Test Version – Sports",
  statements: [
    {
      id: 1,
      text: "An election result is legitimate if it follows established rules, even when my preferred candidate loses.",
    },
    {
      id: 2,
      text: "I would accept an election outcome I strongly disagree with if it meant preserving trust in the democratic process.",
    },
    {
      id: 3,
      text: "I trust the election system more than political leaders to determine fair outcomes.",
    },
  ],
};

export const ACTIVE_STACK = STACK_001;
