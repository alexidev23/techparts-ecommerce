import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, User2, UserCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { User } from "@/types/user";
import { useAuth } from "@/hook/useAuth";

export function UserMenu({ user }: { user: User | null }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <Link to="/login" className="hidden lg:inline-flex">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
          <User2 className="h-4 w-4" />
          Iniciar sesión
        </Button>
      </Link>
    );
  }

  const profilePath = user.role === "admin" ? "/admin" : "/perfil";
  const profileLabel =
    user.role === "admin" ? "Panel de administración" : "Ver perfil";
  const ProfileIcon = user.role === "admin" ? LayoutDashboard : UserCircle;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={user.name ?? user.email}
              className="grayscale"
            />
            <AvatarFallback>
              {(user.name ?? user.email).slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{user.name ?? user.email}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            {user.name && <p className="text-sm font-medium">{user.name}</p>}
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => navigate(profilePath)}>
          <ProfileIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          {profileLabel}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 dark:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
