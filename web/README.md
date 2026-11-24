# Task Manager Web Application

This is the Next.js frontend for the Task Manager application. It provides a responsive, accessible user interface for managing tasks, built with the Next.js App Router, shadcn/ui, React Hook Form, and Zod for strict validation.

## Prerequisites

- Node.js (v20.x or v22.x recommended)
- npm

## Environment Variables

Create a `.env.local` file in this directory by copying the `.env.example` file:

```bash
cp .env.example .env.local
```

The application uses the following environment variables:
- `NEXT_PUBLIC_API_URL`: The base URL for the backend API (default: http://localhost:3001). 
*Note: Because this variable is prefixed with `NEXT_PUBLIC_`, it is inlined into the JavaScript bundle at build time. Ensure this is set correctly before running `npm run build`.*

## Installation and Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Ensure the backend API is running on the configured port (default: 3001). Refer to the `/api` directory README for backend setup instructions.

## Running the Application

- **Development mode** (with hot-reload):
  ```bash
  npm run dev
  ```
  The application will be available at http://localhost:3000.

- **Production build and start**:
  ```bash
  npm run build
  npm run start
  ```

## Testing

The frontend includes a comprehensive unit test suite using Jest and React Testing Library. Tests focus on business logic, data fetching boundaries, and component rendering, including accessibility attributes.

- **Run all tests**:
  ```bash
  npm run test
  ```

- **Run tests in watch mode**:
  ```bash
  npm run test:watch
  ```

## Architecture and UI Decisions

1. **Form Management**: I utilized `react-hook-form` integrated with `zod` for schema validation. To maintain clean and readable JSX, I opted to use the standard `register` function for basic inputs rather than the verbose shadcn `<FormField>` wrappers. I reserved the `<Controller>` component exclusively for complex, uncontrolled components like the shadcn `Select` dropdown.
2. **Data Fetching and Error Handling**: All API interactions are centralized in `lib/api.ts`. This wrapper handles HTTP error parsing and throws standardized errors. Components use `try/catch` blocks to capture these errors and display them to the user via shadcn toast notifications, ensuring a consistent error-handling pattern across the application.
3. **Loading States**: Instead of using disruptive loading spinners, I implemented shadcn `Skeleton` components. This preserves the layout structure during data fetching, providing a smoother and more professional perceived performance.
4. **Validation Strategy**: The frontend Zod schemas strictly mirror the backend NestJS DTOs. This dual-layer validation ensures that invalid data is caught immediately on the client side, providing instant user feedback and preventing unnecessary network requests to the API.
5. **Accessibility (a11y)**: I leveraged shadcn/ui's accessible primitives. Additionally, I ensured that all icon-only interactive elements (such as the edit and delete buttons in the task table) include descriptive `aria-label` attributes for screen reader compatibility.
