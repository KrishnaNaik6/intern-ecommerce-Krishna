"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth-store";

interface Props {
    children: React.ReactNode;
}

export function PublicRoute({
    children,
}: Props) {
    const router = useRouter();

    const isAuthenticated =
        useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/products");
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}