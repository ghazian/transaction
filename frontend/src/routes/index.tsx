import { createFileRoute, Link } from "@tanstack/react-router";
import { authService } from "../services/auth";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome to TransactionFlow
      </h1>
      <p className="text-gray-700 mb-8">
        This is a simple financial transaction management system with role-based
        access.
        <br />
        <br />
        <b>Features:</b>
        <ul className="list-disc list-inside text-left mx-auto max-w-md mt-2 mb-4 text-gray-600">
          <li>Role-based dashboard for Inputters, Approvers, and Auditors</li>
          <li>Secure authentication and session management</li>
          <li>Easy transaction creation and approval workflow</li>
        </ul>
        {isAuthenticated && currentUser ? (
          <>
            <span className="block mb-4">
              Logged in as{" "}
              <b>
                {currentUser.firstName} {currentUser.lastName}
              </b>{" "}
              ({currentUser.role})
            </span>
            <Link
              to="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mr-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
