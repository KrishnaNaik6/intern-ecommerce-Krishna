"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export function UserMenu() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { user, logout, isAuthenticated } = useAuthStore();

  function handleLogout() {
    logout();
    queryClient.clear();
    router.replace("/login");
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href={"/me"}>
        <span className="px-2 py-1 rounded-full border border-gray-300 hover:border-primary">
          {user?.name[0].toUpperCase()}
        </span>
      </Link>

      <Button
        variant="outline"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}