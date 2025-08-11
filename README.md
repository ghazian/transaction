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
- **Framework**: NestJS (Node.js ***v22+***)
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with Passport.js
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Type Safety**: TypeScript
- **Validation**: class-validator
- **Security**: bcryptjs for password hashing & salt

## 📝 Prerequisites
Before you begin, ensure you have
- NodeJS v22 +
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
    npm install

    # Generate Prisma client
    npx prisma generate
    ```

2. #### Environment Setup

    Create a `.env` file in the root directory of ***/backend*** and copy paste this:

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
    # Development mode with hot reload
    npm run dev
    ```

    The API will be available at `http://localhost:3001`

    The Swagger Documentation will be at `http://localhost:3001/api`


**Frontend Setup**
1. #### Install Dependencies
    ```bash
    npm i
    ```

2. #### Run the application
    ```bash
    npm run dev
    ```