import React, { useEffect } from "react";
import { createContext } from "react";

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
  const [token, setToken] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        setToken(JSON.parse(storedToken));
      } catch (error) {
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (token && token.token) {
      localStorage.setItem('authToken', JSON.stringify(token));
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

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