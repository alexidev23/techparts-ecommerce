import type { User } from "@/types/user";

interface FakeUser extends User {
  password: string;
}

const fakeUser: FakeUser[] = [
  { email: "admin@techparts.com", password: "admin123", role: "admin" },
  { email: "usuario@test.com", password: "user123", role: "user" },
];

const USERS_KEY = "users";

const getUsers = (): FakeUser[] => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : fakeUser;
};

export const authService = {
  login: (email: string, password: string) => {
    const users = getUsers();

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) return null;

    const loggedUser = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    localStorage.setItem("authUser", JSON.stringify(loggedUser));

    return loggedUser;
  },

  register: (name: string, email: string, password: string): boolean => {
    const users = getUsers();

    const userExists = users.find((u) => u.email === email);
    if (userExists) return false;

    const newUser: FakeUser = {
      name,
      email,
      password,
      role: "user", // siempre user por defecto
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return true;
  },

  Logout: () => {
    localStorage.removeItem("authUser");
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem("authUser");
    return stored ? JSON.parse(stored) : null;
  },
};
