import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { authService } from "../services/auth";
import { useState, useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    // Check auth status on mount and when storage changes
    const checkAuth = () => {
      setIsAuthenticated(authService.isAuthenticated());
      setCurrentUser(authService.getCurrentUser());
    };

    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener("storage", checkAuth);

    // Custom event for when auth status changes in the same tab
    window.addEventListener("authStatusChanged", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authStatusChanged", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    authService.logout(queryClient);
    setIsAuthenticated(false);
    setCurrentUser(null);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authStatusChanged"));
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-8">
            <Link to="/" className="text-gray-900 hover:text-blue-600">
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-900 hover:text-blue-600"
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="flex space-x-4 items-center">
            {isAuthenticated && currentUser ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {currentUser.firstName}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-900 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-900 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-900 hover:text-blue-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
});
