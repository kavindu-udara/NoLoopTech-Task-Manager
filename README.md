# Task Manager Application
This is a full-stack task management application built with a NestJS backend and a Next.js frontend. It fulfills Section 1 of the [NoLoopTech](https://github.com/NoLoopTech) Junior Full Stack Developer assignment. 

![API CI](https://github.com/kavindu-udara/NoLoopTech-Task-Manager/actions/workflows/ci.yml/badge.svg)
![Web CI](https://github.com/kavindu-udara/NoLoopTech-Task-Manager/actions/workflows/web-ci.yml/badge.svg)

## Prerequisites

- Node.js (v20.x or v22.x recommended)
- npm (or your preferred package manager)

## Manual Setup (Recommended for Review)

Follow these steps exactly to run the project locally from a fresh clone.

### 1. Backend Setup

```bash
# Navigate to the API directory
cd api

# Install dependencies
npm install

# Create the local environment file
cp .env.example .env

# Initialize the SQLite database and run migrations
npx prisma migrate dev --name init

# Start the development server
npm run start:dev
```
The API will be available at http://localhost:3001.

### 2. Frontend Setup

```bash
# Navigate to the Web directory
cd web

# Install dependencies
npm install

# Create the local environment file
cp .env.example .env

# Start the development server
npm run dev
```
The web application will be available at http://localhost:3000.

## Docker Setup (Optional)

For a seamless, isolated setup, you can run the entire stack with a single command using Docker Compose. This handles dependency installation, database creation, and internal networking automatically.

```bash
# From the root directory of the repository
docker-compose up --build
```
- The API will be available at http://localhost:3001
- The web application will be available at http://localhost:3000
- The SQLite database is persisted in a Docker volume, ensuring data survives container restarts.

To stop the services, run `docker-compose down`.

## Testing

Both the backend and frontend include comprehensive unit tests.

- **Backend tests**: `cd api && npm run test`
- **Frontend tests**: `cd web && npm run test`

GitHub Actions workflows are configured in `.github/workflows/` to automatically run linting and tests on every push and pull request.

## Decisions

1. **Database Choice**: I chose SQLite with Prisma ORM over in-memory storage. While in-memory is faster to set up, SQLite demonstrates an understanding of data persistence, schema modeling, and migrations, which are critical for production-ready applications.
2. **Validation Strategy**: I implemented `class-validator` on the backend and `zod` on the frontend. This dual-layer approach ensures strict data integrity at the API boundary while providing immediate, accessible feedback to the user, reducing unnecessary network requests for invalid data.
3. **Error Handling**: I centralized API error handling in the frontend `lib/api.ts` to catch network failures and parse backend error messages consistently. On the backend, I configured the global `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true` to strictly enforce DTO schemas and automatically return 400 Bad Request for malformed payloads.
4. **Frontend Form Architecture**: I opted to use standard `react-hook-form` `register` for basic inputs rather than the verbose shadcn `<FormField>` wrappers. This significantly reduces JSX boilerplate and improves readability. I reserved the `<Controller>` component exclusively for complex, uncontrolled components like the shadcn `Select` dropdown.

## How I Used AI

I used GitHub Copilot (in VS Code) and a chat assistant (Qwen) to accelerate development while maintaining strict architectural control. I treat AI as a junior pair programmer: I provide the architecture and constraints, and it generates the boilerplate, which I then rigorously review and refactor.

### What I Changed in Generated Code
1. **Frontend Form Refactoring**: Copilot initially generated verbose shadcn `<FormField>`, `<FormItem>`, and `<FormControl>` wrappers for every single input. I noticed this created massive, hard-to-read JSX boilerplate. I refactored the form to use standard `react-hook-form` `register` for basic inputs and reserved the `<Controller>` only for the complex `Select` component.
2. **Backend Validation**: Copilot suggested basic TypeScript interfaces for DTOs. I manually upgraded these to use `class-validator` decorators (`@IsString`, `@IsNotEmpty`, `@IsEnum`) and configured the global `ValidationPipe` to ensure strict, secure input sanitization.

### A Mistake the AI Made and How I Noticed It
When I first asked Copilot to set up the backend, it defaulted to using an in-memory array (`let tasks = []`) for data storage. 
- **How I noticed it**: I reviewed the generated code and realized that in-memory storage would lose all data on server restart and cannot handle concurrent request edge cases safely, which is not production-ready.
- **How I fixed it**: I explicitly directed the AI to scaffold a SQLite database using Prisma ORM instead. I then reviewed the generated Prisma schema to ensure the `TaskStatus` enum matched the frontend requirements exactly, and wrote unit tests mocking the Prisma client to verify the business logic.
