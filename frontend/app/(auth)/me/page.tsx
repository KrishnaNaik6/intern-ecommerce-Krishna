"use client";

import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
    User as UserIcon,
    Mail,
    Shield,
    Calendar,
    ArrowLeft,
    ShoppingBag,
    LogOut
} from "lucide-react";

import { useMe } from "@/features/auth/hooks/use-me";
import { PageLoader } from "@/components/shared/page-loader";
import { ProtectedRoute } from "@/components/auth/potected-route";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MePage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: user, isPending, isError, error } = useMe();
    const { logout } = useAuthStore();

    function handleLogout() {
        logout();
        queryClient.clear();
        router.replace("/login");
    }

    if (isPending) {
        return <PageLoader />;
    }

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center p-6">
                <Card className="w-full max-w-md border-red-200 bg-red-50 p-6 text-center text-red-600 shadow-md">
                    <p className="font-semibold">Failed to load profile</p>
                    <p className="mt-1 text-sm opacity-90">{error.message}</p>
                    <Button
                        variant="outline"
                        className="mt-4 border-red-300 text-red-700 hover:bg-red-100"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </Button>
                </Card>
            </div>
        );
    }

    const joinDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Recently";

    return (
        <ProtectedRoute>
            <div className="w-full max-w-md px-4">
                {/* Back Link */}
                <Link
                    href="/products"
                    className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Shop
                </Link>

                {/* Profile Card */}
                <Card className="rounded-xl border shadow-sm">
                    <CardHeader className="text-center pb-2 pt-6">
                        {/* Avatar Container */}
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted border text-2xl font-semibold text-muted-foreground">
                            {user?.name?.[0]?.toUpperCase() || <UserIcon className="h-8 w-8" />}
                        </div>

                        <h2 className="text-xl font-bold tracking-tight mt-4 text-foreground">
                            {user?.name}
                        </h2>
                        <div className="mt-1.5 flex justify-center">
                            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground border">
                                <Shield className="h-3 w-3" />
                                {user?.role}
                            </span>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4 px-6 pb-6 pt-2">
                        {/* Profile Info Fields */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 rounded-lg border p-3 bg-card">
                                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Email Address</p>
                                    <p className="truncate text-sm font-medium text-foreground">{user?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border p-3 bg-card">
                                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                                <div>
                                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Member Since</p>
                                    <p className="text-sm font-medium text-foreground">{joinDate}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <Button asChild className="w-full" variant="outline">
                                <Link href="/orders" className="flex items-center justify-center gap-2">
                                    <ShoppingBag className="h-4 w-4" />
                                    My Orders
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 hover:border-destructive/30"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ProtectedRoute>
    );
}