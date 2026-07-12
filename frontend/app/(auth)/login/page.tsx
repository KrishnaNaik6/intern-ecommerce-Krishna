import { PublicRoute } from "@/components/auth/public-route";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <PublicRoute>
      <LoginForm />;
    </PublicRoute>

  )

}