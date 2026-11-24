# Frontend Development Instructions

When generating or modifying code in the `/web` directory:
1. Do not use the verbose shadcn `<FormField>` wrapper unless absolutely necessary. Prefer `register` from `react-hook-form` for standard inputs to keep JSX clean.
2. Use the `Controller` component from `react-hook-form` when integrating shadcn `Select` or `RadioGroup` components.
3. Always wrap API calls in `try/catch` blocks and display errors using the shadcn `toast` component.
4. Ensure all interactive elements (buttons, links) have visible focus states and appropriate `aria-label` attributes for screen readers.