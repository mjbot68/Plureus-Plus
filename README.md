# Voting Project

This project uses a centralized configuration for voting statements.

## How to edit stack statements

To change the questions or statements displayed in the voting application:

1. Open the file `app/config/stacks.ts`.
2. Find the code block for the active stack (e.g., `STACK_001`).
3. Modify the `text` field for any statement in the `statements` array.
4. If you want to change the overall label of the stack, update the `label` field.
5. If you create a new stack object, make sure to update `export const ACTIVE_STACK = your_new_stack;` at the bottom of the file.

### Example

```typescript
export const STACK_001: Stack = {
  stack_id: "stack-001",
  label: "My New Category",
  statements: [
    {
      id: 1,
      text: "This is a new statement that will appear in the app.",
    },
    // ...
  ],
};
```

The changes will be reflected immediately in the application.
