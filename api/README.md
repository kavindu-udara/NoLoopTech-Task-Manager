# Task Manager API

This is the NestJS backend for the Task Manager application. It provides a RESTful API for managing tasks, utilizing Prisma ORM with a SQLite database for data persistence, and `class-validator` for strict input validation.

## Prerequisites

- Node.js (v20.x or v22.x recommended)
- npm

## Environment Variables

Create a `.env` file in this directory by copying the `.env.example` file:

```bash
cp .env.example .env
```

The application uses the following environment variables:
- `PORT`: The port the server will listen on (default: 3001).
- `WEB_URL`: The allowed origin for CORS (default: http://localhost:3000).
- `DATABASE_URL`: The connection string for the SQLite database (default: file:./dev.db).

## Installation and Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize the database and run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
   *Note: This command creates the `dev.db` SQLite file and generates the Prisma Client based on `schema.prisma`.*

## Running the Application

- **Development mode** (with hot-reload):
  ```bash
  npm run start:dev
  ```

- **Production build**:
  ```bash
  npm run build
  npm run start:prod
  ```

## API Endpoints

All endpoints return JSON. Invalid payloads will return a `400 Bad Request` with detailed validation errors. Requests for non-existent resources will return a `404 Not Found`.

### Get All Tasks
- **Method**: `GET`
- **Path**: `/tasks`
- **Response**: `200 OK` - Array of Task objects.

### Get Task by ID
- **Method**: `GET`
- **Path**: `/tasks/:id`
- **Response**: `200 OK` - Task object, or `404 Not Found`.

### Create Task
- **Method**: `POST`
- **Path**: `/tasks`
- **Request Body**:
  ```json
  {
    "title": "Complete assignment",
    "description": "Finish the NestJS and Next.js task",
    "status": "TODO",
    "dueDate": "2024-12-31T23:59:59.000Z"
  }
  ```
- **Response**: `201 Created` - The newly created Task object.

### Update Task
- **Method**: `PATCH`
- **Path**: `/tasks/:id`
- **Request Body**: (All fields are optional)
  ```json
  {
    "status": "IN_PROGRESS"
  }
  ```
- **Response**: `200 OK` - The updated Task object, or `404 Not Found`.

### Delete Task
- **Method**: `DELETE`
- **Path**: `/tasks/:id`
- **Response**: `200 OK` - The deleted Task object, or `404 Not Found`.

## Testing

The API includes a comprehensive unit test suite using Jest. External dependencies like the Prisma client are mocked to ensure fast and reliable execution.

- **Run all tests**:
  ```bash
  npm run test
  ```

- **Run tests in watch mode**:
  ```bash
  npm run test:watch
  ```

- **Run tests with coverage report**:
  ```bash
  npm run test:cov
  ```

## Architecture Decisions

1. **Data Persistence**: SQLite with Prisma ORM was chosen over in-memory storage to demonstrate proper database modeling, migrations, and data persistence, which are standard requirements for production applications.
2. **Validation**: Input validation is handled at the controller level using `class-validator` DTOs. The global `ValidationPipe` is configured with `whitelist: true` and `forbidNonWhitelisted: true` to automatically strip unknown properties and reject malformed requests with a `400` status code.
3. **Error Handling**: A centralized approach is used in the service layer. Before any `update` or `delete` operation, the service attempts to `findUnique` the record. If it does not exist, a `NotFoundException` is thrown, which NestJS automatically maps to a `404` response.
