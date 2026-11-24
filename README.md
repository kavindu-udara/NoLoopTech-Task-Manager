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

## How to Run (Manual Setup)

Follow these steps exactly to run the project locally:

### Prerequisites

- Node.js v20.x or v22.x
- npm

### 1. Backend Setup

```bash
cd api
npm install

# 1. Create your local environment file
cp .env.example .env

# 2. Initialize SQLite database and run migrations
npx prisma migrate dev --name init

# 3. Start the server
npm run start:dev
```

(The API will run on http://localhost:3001)

### 2. Frontend Setup

```bash
cd web
npm install

# 1. Create your local environment file
cp .env.example .env

# 2. Start the development server
npm run dev
```

(The Web app will run on http://localhost:3000)

## Quick Start with Docker

For a seamless, isolated setup, you can run the entire stack with a single command using Docker Compose. This handles dependency installation, database creation, and networking automatically.

```bash
# From the root directory of the repository
docker-compose up --build
```

- The API will be available at: http://localhost:3001
- The Web app will be available at: http://localhost:3000
- The SQLite database is persisted in a Docker volume named api_data, so your tasks will survive container restarts.

To stop the services:

```bash
docker-compose down
```
