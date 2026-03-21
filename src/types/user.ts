export type UserRole = "admin" | "user";
export type UserStatus = "active" | "inactive";

export interface User {
  id?: string;
  name?: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  phone?: string;
  address?: string;
  postalCode?: string;
  province?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
}
