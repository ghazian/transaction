# Transaction Management System - Backend

NestJS backend API for a financial transaction management system with role-based access control, JWT authentication, and comprehensive transaction workflow management.

## 🏗️ Architecture

This backend provides a complete REST API for managing financial transactions with the following features:

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Transaction Management**: Create, approve, and audit financial transactions
- **User Management**: Multi-role user system (INPUTTER, APPROVER, AUDITOR)
- **Database**: SQLite with Prisma ORM
- **API Documentation**: Swagger/OpenAPI integration
- **Testing**: Comprehensive unit and integration tests

## 🛠️ Tech Stack

- **Framework**: NestJS (Node.js)
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with Passport.js
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Type Safety**: TypeScript
- **Validation**: class-validator
- **Security**: bcrypt for password hashing

## 📋 Prerequisites

- Node.js 23+
- npm 

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
# CD to /backend
cd backend/

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate
```

### 2. Environment Setup

Create a `.env` file in the root directory of ***/backend***:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-fintech-transaction-app-2025"
JWT_EXPIRES_IN="24h"

```

### 3. Database Setup

```bash
# Create and migrate database
npx prisma db push

# Seed database with initial data
npm run db:seed
```

### 4. Run the Application

```bash
# Development mode with hot reload
npm run dev
```

The API will be available at `http://localhost:3001`

The Swagger Documentation will be at `http://localhost:3001/api`

## 📊 Database Schema

### Users

- **INPUTTER**: Can create transactions
- **APPROVER**: Can view and approve transactions
- **AUDITOR**: Can only view transactions (read-only)

### Transactions

- Created by INPUTTERs
- Approved/Rejected by APPROVERs
- Audited by AUDITORs
- Status tracking: PENDING → APPROVED/REJECTED

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in requests:

```http
Authorization: Bearer <your-jwt-token>
```

### Default Users (from seed data)

- **Inputter**: `inputter@example.com` / `password123`
- **Approver**: `approver@example.com` / `password123`
- **Auditor**: `auditor@example.com` / `password123`

## 📚 API Documentation

Once running, access the interactive API documentation at:

- **Swagger UI**: `http://localhost:3001/api`
- **JSON Schema**: `http://localhost:3001/api-json`

### Key Endpoints

```http
# Authentication
POST /auth/register    # Register new user
POST /auth/login       # User login

# Transactions
GET    /transactions           # List all transactions (INPUTTER / APPROVER / AUDITOR)
POST   /transactions           # Create new transaction (INPUTTER only)
PATCH  /transactions/:id/approve # Approve transaction (APPROVER only)
```

## 🧪 Testing

```bash
# Run unit tests
npm test
```

### Database Commands

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database (destructive!)
npx prisma db push --force-reset

# Generate Prisma client after schema changes
npx prisma generate
```

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access**: Granular permissions per endpoint
- **Input Validation**: Comprehensive DTO validation
- **CORS Protection**: Configurable cross-origin settings

## 🔄 Workflow

1. **INPUTTER** creates a transaction (status: PENDING)
2. **APPROVER** reviews and approves/rejects the transaction
3. **AUDITOR** can view all transactions for compliance
4. System tracks complete audit trail with timestamps and user attribution

## 🚨 Error Handling

The API provides consistent error responses:

```json
{
  "statusCode": 400,
  "message": ["Validation error details"],
  "error": "Bad Request"
}
```

Common HTTP status codes:

- `400`: Bad Request (validation errors)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (resource doesn't exist)
- `409`: Conflict (duplicate data)

