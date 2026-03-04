import { createContext, useState, type ReactNode } from "react";
import { authService } from "@/services/authService";
import type { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  loginUser: (email: string, password: string) => boolean;
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

  function loginUser(email: string, password: string) {
    const loggedUser = authService.login(email, password);

    if (!loggedUser) return false;

    setUser(loggedUser);

    return true;
  }

  function logout() {
    authService.Logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
