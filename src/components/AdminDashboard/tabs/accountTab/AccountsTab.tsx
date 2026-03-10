import UsersTable from "./UsersTable";

export default function AccountsTab() {
  return (
    <section
      aria-label="Gestión de cuentas"
      className="w-full rounded-lg bg-white p-6 shadow dark:bg-gray-950"
    >
      <UsersTable />
    </section>
  );
}
