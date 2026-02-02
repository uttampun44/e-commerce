/**
 * Complete Example: Dashboard with Clerk Authentication
 * This shows how to use Clerk throughout your application
 */

import { useUser, useClerk, useAuth } from "@clerk/clerk-react";
import { useAuhthContext } from "@/contextapi/auth";
import { Button } from "@/components/ui/button";

export default function DashboardExample() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { token } = useAuhthContext();

  // While Clerk is loading
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // User not authenticated
  if (!user) {
    return (
      <div>
        <p>Please sign in first</p>
        <a href="/clerk-login">Go to Login</a>
      </div>
    );
  }

  // User is authenticated
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      {/* User Info from Clerk */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-semibold">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          <div>
            <p className="text-gray-600">User ID</p>
            <p className="font-semibold text-sm">{user.id}</p>
          </div>
          <div>
            <p className="text-gray-600">Created</p>
            <p className="font-semibold">
              {user.createdAt?.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Auth Context Info */}
      {token && (
        <div className="bg-blue-50 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Auth Context</h2>
          <div>
            <p className="text-gray-600">Stored User Email</p>
            <p className="font-semibold">{token.user.email}</p>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            ✅ Auth context is synced with Clerk
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Sign Out
        </Button>
        <a href="/products">
          <Button className="bg-blue-600 hover:bg-blue-700">
            View Products
          </Button>
        </a>
      </div>

      {/* Example: Making Protected API Call */}
      <ProtectedApiExample />
    </div>
  );
}

/**
 * Example component showing how to make API calls with Clerk token
 */
function ProtectedApiExample() {
  const { getToken } = useAuth();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const fetchProtectedData = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await fetch("/api/v1/protected-endpoint", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-green-50 rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Test Protected API</h2>
      <Button
        onClick={fetchProtectedData}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700"
      >
        {loading ? "Loading..." : "Call Protected Endpoint"}
      </Button>
      {data && (
        <div className="mt-4 p-4 bg-white rounded border border-green-200">
          <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

/**
 * USAGE IN YOUR APP:
 * 
 * This example shows:
 * 1. Using useUser() to get Clerk user info
 * 2. Using useClerk() to access signOut
 * 3. Checking if user is loaded and authenticated
 * 4. Displaying user information
 * 5. Accessing the auth context
 * 6. Making protected API calls with Clerk token
 * 
 * Place this in a protected route to ensure user is authenticated.
 */

import React from "react";
