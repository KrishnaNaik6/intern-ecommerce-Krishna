"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPasswordSchema, ForgotPasswordFormValues } from "../schemas/forgot-password-schema";

import { useForgotPassword } from "../hooks/use-forgot-password";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm() {
    const [success, setSuccess] =
        useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(
            forgotPasswordSchema,
        ),
    });

    const mutation =
        useForgotPassword();

    async function onSubmit(
        values: ForgotPasswordFormValues,
    ) {
        try {
            const response =
                await mutation.mutateAsync(values);

            setSuccess(response.message);
        } catch (error: any) {
            alert(
                error.response?.data?.message ??
                "Something went wrong",
            );
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-20 max-w-md space-y-5 rounded-xl border p-8 shadow"
        >
            <h1 className="text-center text-3xl font-bold">
                Forgot Password
            </h1>

            <p className="text-center text-sm text-muted-foreground">
                Enter your email to receive a
                password reset link.
            </p>

            <div>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                />

                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
            >
                {mutation.isPending
                    ? "Sending..."
                    : "Send Reset Link"}
            </Button>

            {success && (
                <div className="rounded bg-green-100 p-3 text-sm text-green-700">
                    {success}
                </div>
            )}
        </form>
    );
}