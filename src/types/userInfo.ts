import type { UserRole } from "./user";

export type UserStatus = "active" | "inactive";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}
