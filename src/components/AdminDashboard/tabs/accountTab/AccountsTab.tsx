import type { AdminUser } from "@/services/adminService";
import UsersTable from "./UsersTable";

interface AccountsTabProps {
  users: AdminUser[];
  onUsersChange: (users: AdminUser[]) => void;
}

export default function AccountsTab({
  users,
  onUsersChange,
}: AccountsTabProps) {
  return (
    <section
      aria-label="Gestión de cuentas"
      className="w-full rounded-lg bg-white p-6 shadow dark:bg-gray-950"
    >
      <UsersTable users={users} onUsersChange={onUsersChange} />
    </section>
  );
}
