import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "Next.js + NestJS Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />

          <main className="mx-auto max-w-7xl p-6">
            {children}
          </main>

        </Providers>
      </body>
    </html>
  );
}