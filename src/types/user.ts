export type UserRole = "admin" | "user";

export interface User {
  name?: string;
  email: string;
  role: UserRole;
}
