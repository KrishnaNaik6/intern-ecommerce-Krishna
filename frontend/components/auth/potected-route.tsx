"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@/store/auth-store";
import { isTokenExpired } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isAuthenticated, accessToken, logout } = useAuthStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      if (isTokenExpired(accessToken)) {
        logout();
        queryClient.clear();
        router.replace("/login");
        return;
      }
    }

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    setCheckingAuth(false);
  }, [isAuthenticated, accessToken, logout, queryClient, router]);

  const hasExpired = isAuthenticated && accessToken ? isTokenExpired(accessToken) : false;

  if (!isAuthenticated || hasExpired || checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}