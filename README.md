# Task Manager

![API CI](https://github.com/kavindu-udara/NoLoopTech-Task-Manager/actions/workflows/ci.yml/badge.svg)
![Web CI](https://github.com/kavindu-udara/NoLoopTech-Task-Manager/actions/workflows/web-ci.yml/badge.svg)

## How I Used AI

I used **GitHub Copilot** (in VS Code) and a **Chat Assistant** (Qwen) to accelerate development while maintaining strict architectural control. I treat AI as a junior pair programmer: I provide the architecture and constraints, and it generates the boilerplate, which I then rigorously review and refactor.

### What I Changed in Generated Code
1. **Frontend Form Refactoring**: Copilot initially generated verbose shadcn `<FormField>`, `<FormItem>`, and `<FormControl>` wrappers for every single input. I noticed this created massive, hard-to-read JSX boilerplate. I refactored the form to use standard `react-hook-form` `register` for basic inputs and reserved the `<Controller>` only for the complex `Select` component, significantly improving readability.
2. **Backend Validation**: Copilot suggested basic TypeScript interfaces for DTOs. I manually upgraded these to use `class-validator` decorators (`@IsString`, `@IsNotEmpty`, `@IsEnum`) and configured the global `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true` to ensure strict, secure input sanitization.

### A Mistake the AI Made and How I Noticed It
When I first asked Copilot to set up the backend, it defaulted to using an **in-memory array** (`let tasks = []`) for data storage. 
- **How I noticed it**: I reviewed the code and realized that in-memory storage would lose all data on server restart and cannot handle concurrent request edge cases safely, which is not production-ready.
- **How I fixed it**: I explicitly directed the AI to scaffold a **SQLite database using Prisma ORM** instead. I then reviewed the generated Prisma schema to ensure the `TaskStatus` enum matched the frontend requirements exactly, and wrote unit tests mocking the Prisma client to verify the logic.