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
      text: "The U.S. Economy is headed in the right direction.",
    },
    {
      id: 2,
      text: "Winning championships matters more than individual performance when judging greatness.",
    },
    {
      id: 3,
      text: "Modern players are more skilled than players from previous eras.",
    },
  ],
};

export const ACTIVE_STACK = STACK_001;
