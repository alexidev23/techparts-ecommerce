import { createContext, useState, type ReactNode } from "react";
import { authService } from "@/services/authService";
import type { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<User | null>;
  registerUser: (
    name: string,
    email: string,
    password: string,
  ) => Promise<User | null>;
  logout: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    return authService.getCurrentUser();
  });

  async function loginUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    try {
      const { user: loggedUser } = await authService.login(email, password);
      setUser(loggedUser);
      return loggedUser;
    } catch {
      return null;
    }
  }

  async function registerUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User | null> {
    try {
      const { user: newUser } = await authService.register(
        name,
        email,
        password,
      );
      setUser(newUser);
      return newUser;
    } catch {
      return null;
    }
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
