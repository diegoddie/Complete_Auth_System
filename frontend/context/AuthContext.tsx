"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface User {
  _id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (userData: User, token: string) => void;
  updateUser: (userData: User) => void;
  updateAccessToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  updateUser: () => {},
  updateAccessToken: () => {},
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
  initialUser: User | null;
  initialAccessToken: string | null;
}

export const AuthProvider = ({ children, initialUser, initialAccessToken }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null >(initialUser);
  const [accessToken, setAccessToken] = useState<string | null>(initialAccessToken);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setAccessToken(token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const updateAccessToken = (token: string) => {
    setAccessToken(token);
  };

  const value = {
    user,
    accessToken,
    login,
    logout,
    updateUser,
    updateAccessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
