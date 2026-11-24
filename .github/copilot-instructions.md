# GitHub Copilot Instructions

## Project Context
This is a monorepo containing a full-stack Task Manager application:
- `/api`: NestJS backend with Prisma ORM and SQLite.
- `/web`: Next.js (App Router) frontend with shadcn/ui, React Hook Form, and Zod.

## Global Coding Standards
1. **TypeScript Strictness**: Never use `any`. Define explicit interfaces and types.
2. **Error Handling**: Always handle edge cases (e.g., 404 for missing resources, 400 for invalid input). Use global exception filters in NestJS and toast notifications in Next.js.
3. **Accessibility (a11y)**: Always include `aria-label` on icon-only buttons. Ensure form inputs have associated `<label>` elements.
4. **Testing**: All new business logic must have corresponding Jest unit tests. Mock external dependencies (like Prisma or `fetch`) instead of hitting real databases/networks.

## Backend (`/api`) Rules
- Use `class-validator` and `class-transformer` for all DTOs.
- Enable `whitelist: true` and `forbidNonWhitelisted: true` in the global ValidationPipe.
- Use Prisma for data persistence. Always check if a record exists before updating/deleting to return a proper `NotFoundException`.

## Frontend (`/web`) Rules
- Use `react-hook-form` with `zod` resolver for all forms.
- Prefer standard `register` for simple inputs and `Controller` only for complex components like shadcn `Select`.
- Use Skeleton loaders for initial data fetching states, not basic spinners.
- Centralize all API calls in `lib/api.ts` with a unified error handler.