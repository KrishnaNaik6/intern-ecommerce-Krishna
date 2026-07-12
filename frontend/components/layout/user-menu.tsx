"use client";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/store/auth-store";

export function UserMenu() {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex items-center gap-4">

      <span>
        {user?.name}
      </span>

      <Button
        variant="outline"
        onClick={logout}
      >
        Logout
      </Button>

    </div>
  );
}