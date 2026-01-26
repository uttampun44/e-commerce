import { useAuhthContext } from "@/contextapi/auth";
import Backend from "@/layout/backend/backend";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import {Outlet } from "react-router";

/**
 * ProtectRoutes component protects routes from unauthorized access
 * If user is not logged in, shows access denied
 * If user is logged in, renders the protected component
 */
export default function ProtectRoutes() {
  const { token, isLoading } = useAuhthContext();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!token || !token.token) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to login to access this page</p>
          <a href="/login" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <Backend>
      <Outlet />
    </Backend>
  );
}
