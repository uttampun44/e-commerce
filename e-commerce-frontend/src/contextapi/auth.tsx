import React, { useEffect } from "react";
import { createContext } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

type AuthUser = {
    user: {
        id: string;
        name: string;
        email: string;
    }
    token: string | null;
    setToken?: (token: string | null) => void;

}

type AuthContextType = {
  token: AuthUser | null;
  setToken: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const { isLoaded: isClerkLoaded, isSignedIn, getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const [token, setToken] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Handle Clerk authentication
  useEffect(() => {
    const syncClerkAuth = async () => {
      // First, always wait for Clerk to load
      if (!isClerkLoaded) {
        return;
      }

      try {
        // If user IS signed in with Clerk
        if (isSignedIn && clerkUser) {
          const clerkToken = await getToken();
          
          if (clerkToken) {
            const userData = {
              user: {
                id: clerkUser.id,
                name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || "User",
                email: clerkUser.primaryEmailAddress?.emailAddress || "",
              },
              token: clerkToken,
            };
            setToken(userData);
            localStorage.setItem('authToken', JSON.stringify(userData));
          }
        } else {
          // User NOT signed in - clear the token
          localStorage.removeItem('authToken');
          setToken(null);
        }
      } catch (error) {
        console.error('Auth sync error:', error);
        localStorage.removeItem('authToken');
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    syncClerkAuth();
  }, [isClerkLoaded, isSignedIn, clerkUser, getToken]);

  return (
    <AuthContext.Provider value={{ token, setToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuhthContext = () => {
  const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
}