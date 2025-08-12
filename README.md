# TransactionFlow - AG RBAC Transaction

## 🚀 Tech Stack

### Frontend

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: TanStack Router (type-safe)
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + React Testing Library
- **HTTP Client**: Fetch API with custom service layer
- **Authentication**: JWT tokens with localStorage persistence

### Backend

- **Framework**: NestJS (Node.js **_v23+_**)
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with Passport.js
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Type Safety**: TypeScript
- **Validation**: class-validator
- **Security**: bcryptjs for password hashing & salt

## 📝 Prerequisites

Before you begin, ensure you have

- NodeJS v23+
- NPM

## 🛠️ Installation and Setup

### Local Development Setup

Clone the project

```bash
git clone <repository-link>
```

**Backend Setup**

1. #### Install Dependencies

   ```bash
   # CD to /backend
   cd backend/

   # Install dependencies
   npm i

   # Generate Prisma client
   npx prisma generate
   ```

2. #### Environment Setup

   Create a `.env` file in the root directory of **_/backend_** and copy paste this:

   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-fintech-transaction-app-2025"
   JWT_EXPIRES_IN="24h"

   ```

3. #### Database Setup

   ```bash
   # Create and migrate database
   npx prisma db push

   # Seed database with initial data
   npm run db:seed
   ```

4. #### Run the Application

   ```bash
   npm run start
   ```

   The API will be available at `http://localhost:3001`

   The Swagger Documentation will be at `http://localhost:3001/api`

**Frontend Setup**

1. #### Install Dependencies

   ```bash
   cd frontend/

   npm i
   ```

2. #### Run the application
   ```bash
   npm run dev
   ```

## 🏋️ Demo Users after DB Seed

```
Inputter: inputter@example.com / password123

Approver: approver@example.com / password123

Auditor: auditor@example.com / password123
```

## 🧪 Testing

**Backend & Frontend Directory**

```bash
    npm test
```

## 🧑‍💻 Database Maintenance

Remove stale database in root of **/backend** directory

```bash
    # Delete the database
    rm -rf prisma/dev.db

    # Create and migrate database
    npx prisma db push

    # Create seed data
    npm run db:seed
```

## 🔖 How Permissions are handled

#### JWT Payload

```json
{
  "sub": "user_id",
  "email": "user_email",
  "role": "INPUTTER | APPROVER | AUDITOR",
  "iat": 1691760000,
  "exp": 1691846400
}
```

#### Endpoints 
- ##### Auth

   | Endpoint       | Body                                                                                                                                 |   |   |   |
   |----------------|--------------------------------------------------------------------------------------------------------------------------------------|---|---|---|
   | `POST /auth/register` | `{ "email": "jane.smith@example.com", "password": "wowPass123", "firstName": "Jane", "lastName": "Smith", "role": "<Role>" }` |   |   |   |
   | `POST /auth/login`    | `{ "email": "john.doe@example.com", "password": "wowPass123" }`                                                                 |   |   |   |

- ##### Permissions

   | Endpoint                             | Inputter | Approver | Auditor |
   | ------------------------------------ | -------- | -------- | ------- |
   | `GET /transactions`              | ✅       | ✅       | ✅      |
   | `POST /transactions`             | ✅       | ❌       | ❌      |
   | `POST /transactions/:id/approve` | ❌       | ✅       | ❌      |

## 🧠 Design Decisions

### 1. Monorepo Structure

- Both frontend and backend are kept in a single repository for easier onboarding, consistent versioning, and simplified local development.

### 2. Type Safety Everywhere

- TypeScript is used for both backend (NestJS) and frontend (React) to ensure type safety, reduce runtime errors, and improve developer experience.

### 3. Role-Based Access Control

- The system uses three roles (INPUTTER, APPROVER, AUDITOR) to enforce business logic and UI/endpoint access, both on the backend (via guards) and frontend (via conditional rendering).

### 4. JWT Authentication

- Stateless JWT tokens are used for authentication, with user id, email, and role encoded in the token payload for easy access control and session management.

### 5. Database: SQLite with Prisma ORM

- SQLite is chosen for simplicity and ease of local development. Prisma ORM provides type-safe database access and easy schema migrations.

### 6. API-First, Service-Oriented Architecture

- The backend exposes a RESTful API with clear separation of concerns (auth, transactions, users). All business logic is encapsulated in service classes.

### 7. Modern React Patterns

- The frontend uses TanStack Router and Query for type-safe routing and server state management, with a component-based architecture for maintainability and testability.

### 8. Component Abstraction

- Complex UI logic is abstracted into reusable, testable components (e.g., modal forms, tables, state displays) to promote code reuse and clarity.

### 9. No Committed Database Files

- SQLite database files are git-ignored to ensure every developer starts with a clean slate and to avoid merge conflicts or leaking test data.

### 10. API Documentation

- Swagger is integrated for backend API documentation, ensuring that endpoints are discoverable and testable by both frontend and external consumers.

### 11. Security Best Practices

- Passwords are hashed with bcrypt, JWT secrets are required, and CORS is configurable.
