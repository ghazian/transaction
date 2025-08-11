# Transaction Management System - Frontend

A modern React frontend application for managing financial transactions with role-based access control, and comprehensive transaction workflow management.

## 🏗️ Architecture

This frontend provides a complete user interface for the transaction management system with the following features:

- **Modern React Stack**: React 19 with TypeScript and Vite
- **State Management**: TanStack Query for API management management
- **Routing**: TanStack Router for type-safe routing
- **Authentication**: JWT token-based authentication with auto-refresh
- **UI Components**: Custom component architecture with Tailwind CSS
- **Testing**: Unit tests with Vitest and React Testing Library
- **Type Safety**: Full TypeScript coverage throughout the application

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: TanStack Router (type-safe)
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + React Testing Library
- **HTTP Client**: Fetch API with custom service layer
- **Authentication**: JWT tokens with localStorage persistence

## 📋 Prerequisites

- Node.js 23+
- npm
- Backend API running on port 3001 (see backend README)

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
# Clone repository
git clone <repository-link>

# CD to /frontend
cd frontend/

# Install dependencies
npm install
```

### 2. Environment Setup

For the purpose of this project, .env variables are not needed although on production apps, it will be heavily enforced

### 3. Run the Application

```bash
# Development server with hot reload
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎯 Features

### Authentication System

- **Login/Registration**: Secure JWT-based authentication
- **Auto Token Refresh**: 24h token availability
- **Role-Based UI**: Different interfaces per user role
- **Persistent Sessions**: Automatic login state persistence

### Transaction Management

- **Create Transactions**: Form interface (INPUTTER role)
- **Approve Transactions**: One-click approval system (APPROVER role)
- **Transaction Lists**: Comprehensive data tables (All roles)

### User Roles & Permissions

- **INPUTTER**: Create and view own transactions and all transactions
- **APPROVER**: View all transactions and approve/reject pending ones
- **AUDITOR**: Read-only access to all transactions

### Component Benefits

- ✅ **Single Responsibility**: Each component has one clear purpose
- ✅ **Testability**: Components can be tested in isolation
- ✅ **Reusability**: Modular design allows component reuse
- ✅ **Type Safety**: Full TypeScript coverage with proper interfaces

## 📚 API Integration

### Service Layer

```typescript
// Example API service usage
import { transactionsService } from "./services/transactions";
import { authService } from "./services/auth";

// All services include:
// - Type-safe request/response handling
// - Automatic JWT token inclusion
// - Error handling with proper TypeScript types
// - Data normalization (e.g., Decimal to number conversion)
```

### TanStack Query Integration

```typescript
// Example query usage
const {
  data: transactions,
  isLoading,
  error,
} = useQuery({
  queryKey: ["transactions"],
  queryFn: transactionsService.getTransactions,
});
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test
```

## 🔄 State Management

### TanStack Query Benefits

- **Background Updates**: Automatic refetching on window focus
- **Optimistic Updates**: Immediate UI updates with rollback
- **Loading States**: Built-in loading and error state management

### Authentication State

```typescript
// Auth state managed through service layer
const currentUser = authService.getCurrentUser();
const token = authService.getToken();

// Automatic token validation and refresh
// Persistent storage across browser sessions
```

## 🛡️ Security Features

- **JWT Token Management**: Secure token storage and automatic refresh
- **CORS Handling**: Configured for secure cross-origin requests
- **Role-Based Access**: UI elements hidden/shown based on user permissions
- **Input Validation**: Client-side validation with TypeScript types

## 🔍 Debugging

### Development Tools

- **React DevTools**: Component inspection and profiling
- **TanStack Router DevTools**: Route debugging and navigation
- **TanStack Query DevTools**: Query state and cache inspection
- **Browser DevTools**: Network requests and console logging

## 📄 API Integration

### Authentication Flow

```typescript
// Login process
const loginResponse = await authService.login(credentials);
// Token automatically stored and attached to future requests

// Protected route access
const transactions = await transactionsService.getTransactions();
// JWT token automatically included in Authorization header
```
