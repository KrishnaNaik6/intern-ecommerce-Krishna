"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "../schemas/register.schema";
import { useRegister } from "../hooks/use-register";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Link from "next/link";

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  })

  const registerMutation = useRegister()

  const registerStore = useAuthStore((state) => state.login)

  async function onSubmit(values: RegisterFormValues) {
    try {
      const response = await registerMutation.mutateAsync(values);

      registerStore(
        response.data.user,
        response.data.accessToken,
        response.data.refreshToken
      )

      toast.success("Registration successful");
      router.push(ROUTES.PRODUCTS);
    } catch (error: any) {
      toast.error(
        error.response?.data?.error?.message ??
        "Registration failed",
      )
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg ">
      <CardHeader>
        <CardTitle className="text-2xl">
          Register here
        </CardTitle>

        <CardDescription>
          Register your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                {...register("password")}

              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            className="w-full"
            disabled={registerMutation.isPending}>
            {
              registerMutation.isPending ? "Registering" : "Register"
            }
          </Button>

          <div className="text-center text-sm">
            Already have account?{" "}
            <Link href="/login"
              className="font-medium text-primary hover:underline"
            >Login
            </Link>
          </div>

        </form>
      </CardContent>
    </Card>
  )
}