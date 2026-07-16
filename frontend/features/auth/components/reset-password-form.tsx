"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/features/auth/schemas/reset-password-schema";

import { useResetPassword } from "@/features/auth/hooks/use-reset-password";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const mutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(
    values: ResetPasswordFormValues,
  ) {
    if (!token) {
      alert("Invalid reset link");
      return;
    }

    try {
      await mutation.mutateAsync({
        token,
        password: values.password,
      });

      alert("Password updated successfully");

      router.replace("/login");
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
        Reset Password
      </h1>

      <Input
        type="password"
        placeholder="New Password"
        {...register("password")}
      />

      {errors.password && (
        <p className="text-sm text-red-500">
          {errors.password.message}
        </p>
      )}

      <Input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />

      {errors.confirmPassword && (
        <p className="text-sm text-red-500">
          {errors.confirmPassword.message}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending
          ? "Updating..."
          : "Reset Password"}
      </Button>
    </form>
  );
}