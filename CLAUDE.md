# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Calquen Server is a NestJS-based REST API for HR management (RH - Recursos Humanos) built with TypeScript, Prisma ORM, and PostgreSQL. The system manages companies, employees, documents, user requests, roles, and permissions.

## Essential Commands

### Development
```bash
npm run start:dev          # Start with hot-reload
npm run start:debug        # Start with debug mode
npm run build              # Build for production
npm run start:prod         # Run production build
```

### Database (Prisma)
```bash
npm run prisma:generate    # Generate Prisma client after schema changes
npm run prisma:push        # Push schema to database (no migration)
npm run prisma:migrate     # Create and apply migration
npm run prisma:studio      # Open Prisma Studio GUI
npm run prisma:reset       # Reset database (WARNING: deletes data)
```

### Testing & Quality
```bash
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run e2e tests
npm run lint               # Run ESLint with auto-fix
npm run format             # Format code with Prettier
```

## Architecture

### Core Infrastructure

**PrismaService** (`src/prisma/prisma.service.ts`)
- Custom Prisma client wrapper with connection lifecycle management
- `safePrismaCall<T>()`: Wraps all database operations with automatic error handling
- `isHealthy()`: Database health check method
- Connects on module init, disconnects on destroy

**Error Handling** (`src/common/helpers/handle-exceptions.ts`)
- Centralized Prisma error handler with specific error code mapping
- Converts Prisma errors (P2002, P2003, P2025, etc.) to NestJS HTTP exceptions
- All services MUST use `prisma.safePrismaCall()` for database operations

**Pagination System** (`src/common/helpers/pagination.helper.ts`)
- Three static methods: `paginate()`, `paginateWithSelect()`, `paginateWithInclude()`
- Returns standardized response with `data`, `page`, `limit`, `total`, `total_pages`, `links`
- Max limit: 100, default: 10
- Always orders by `created_at: 'desc'`

### Module Structure Pattern

Every resource module follows this structure:
```
src/{resource}/
├── dto/
│   ├── create-{resource}.dto.ts    # Uses ApiProperty, class-validator
│   └── update-{resource}.dto.ts    # Extends PartialType from create DTO
├── entities/
│   └── {resource}.entity.ts
├── {resource}.controller.ts         # Uses ParseUUIDPipe for params
├── {resource}.service.ts            # Uses PrismaService.safePrismaCall()
├── {resource}.module.ts             # Imports PrismaModule if using database
├── {resource}.controller.spec.ts
└── {resource}.service.spec.ts
```

### Implemented Modules

**Fully Implemented:**
- `UserModule`: CRUD with role relations, pagination, soft delete
- `CompanyModule`: CRUD with relation counts (_count), pagination

**Scaffolded (not implemented):**
- `EmployeeModule`: Complex employee data with AFP, health system, salary
- `RequestModule`: Client request management with status workflow
- `DocumentModule`: Document management (needs file upload)
- `RoleModule`: Role-based access control
- `ModuleModule`: Module/permission management

### API Standards

**Controllers:**
- Use `@Controller('resource')` without version prefix (global prefix is `/api`)
- API versioning enabled (URI-based) via `app.enableVersioning()` in `main.ts`
- Validate UUIDs with `@Param('id', ParseUUIDPipe)`
- Use `PaginationDto` from `src/common/dto/pagination.dto.ts` for list endpoints

**DTOs:**
- Use `@ApiProperty()` decorators for Swagger documentation
- Use `class-validator` decorators (`@IsEmail`, `@IsString`, `@IsUUID`, etc.)
- Custom validators: RUT format validation with `@Matches(/^[0-9]+-[0-9kK]$/)`
- Update DTOs use `@nestjs/mapped-types` `PartialType`

**Services:**
- Inject `PrismaService` via constructor
- Always wrap Prisma calls: `this.prisma.safePrismaCall(this.prisma.{model}.{operation}())`
- Use `PaginationHelper.paginateWithSelect()` for paginated list endpoints
- Soft delete pattern: update `is_active: false` instead of actual deletion

**Validation:**
- Global ValidationPipe configured in `main.ts`:
  - `whitelist: true` - strips non-whitelisted properties
  - `transform: true` - auto-transforms primitives
  - `forbidNonWhitelisted: true` - throws on extra properties
  - `forbidUnknownValues: true` - throws on unknown values

### Environment Configuration

**Required Variables** (validated in `src/config/env.validation.ts`):
- `NODE_ENV`: 'development' | 'production' | 'test'
- `PORT`: number (1-65535)
- `DATABASE_URL`: PostgreSQL connection string

The `validate()` function uses `class-transformer` and `class-validator` to ensure all env vars are present and valid at startup.

### Database Schema Key Points

**Core Models:**
- `user`: Email/password auth, RUT (Chilean ID), role-based, soft delete with `is_active`
- `company`: Business info, has many employees, requests, documents
- `employee`: Complex model with AFP (pension), health system (FONASA/ISAPRE), contract type, salary
- `client_request`: Request workflow with PENDING/APPROVED/REJECTED status
- `role` + `permission` + `module`: RBAC system with `role_module_permission` junction table

**Enums:**
- `CONTRACT_TYPE`: INDEFINIDO, PLAZO_FIJO, POR_OBRA, HONORARIOS, PRACTICA
- `AFP_TYPE`: AFP_CAPITAL, AFP_CUPRUM, AFP_HABITAT, AFP_PLANVITAL, AFP_PROVIDA, AFP_MODELO, AFP_UNO
- `HEALTHCARE_SYSTEM`: FONASA, ISAPRE
- `CLIENT_REQUEST_STATUS`: PENDING, APPROVED, REJECTED
- `EMPLOYE_REQUEST_STATUS`: PENDING, APPROVED, REJECTED

**Indexes:** Most tables have composite indexes on frequently queried fields (e.g., `company_id + status`)

## Development Notes

### When Creating New Modules:

1. Import and inject `PrismaModule` in module
2. Use `safePrismaCall()` for all database operations
3. Implement pagination using `PaginationHelper` for GET all endpoints
4. Add `@ApiProperty()` to all DTO properties for Swagger docs
5. Use `ParseUUIDPipe` for UUID parameters
6. Implement soft delete if model has `is_active` field

### Authentication Implementation (TODO):

The `user` model has `password` (optional), `token`, and `last_conection` fields for auth, but no AuthModule exists yet. When implementing:
- Use `@nestjs/passport` with JWT strategy
- Hash passwords with `bcrypt` (already in dependencies)
- Store JWT in `token` field, update `last_conection` on login
- Implement guards based on `role_id` and permission system

### File Upload (TODO):

The `rh_document` model has `type`, `size` fields for file metadata but no upload implementation. When implementing:
- Use `@nestjs/platform-express` (already imported)
- Store files in cloud storage (S3, GCS) or local filesystem
- Validate file types against `type` field
- Track file size in `size` field (Decimal type)
