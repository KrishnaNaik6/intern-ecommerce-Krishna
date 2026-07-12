"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth-store";

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute({
  children,
}: Props) {
  const router = useRouter();

  const isAuthenticated =
    useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}