# Backend Development Instructions

When generating or modifying code in the `/api` directory:
1. Always generate NestJS resources using the standard Controller/Service/Module pattern.
2. For Prisma operations, always handle the case where `findUnique` returns `null` by throwing `new NotFoundException()`.
3. When writing Jest tests for services, always mock the `PrismaService` methods (`create`, `findMany`, `findUnique`, `update`, `delete`) using `jest.fn()`.
4. Ensure all DTOs have appropriate `@IsString()`, `@IsNotEmpty()`, or `@IsEnum()` decorators from `class-validator`.
