import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">
        E-Commerce
      </h1>

      <p className="text-muted-foreground">
        Next.js + NestJS + PostgreSQL
      </p>

      <div className="flex gap-4">
        <Link href="/auth/login">
          <Button>
            Login
          </Button>
        </Link>

        <Link href="/auth/register">
          <Button variant="outline">
            Register
          </Button>
        </Link>
      </div>
    </main>
  );
}
