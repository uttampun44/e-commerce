import React from "react";
import { AuthContextProvider } from "./auth";

type CombineContextProviderProps = {
  children: React.ReactNode;
};

/**
 * CombineContextProvider wraps all context providers
 * This is the single point to manage all global state providers
 */
export const CombineContextProvider: React.FC<CombineContextProviderProps> = ({ children }) => {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
};
