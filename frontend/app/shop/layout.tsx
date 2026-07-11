import { Navbar } from "@/components/layout/navbar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </>
  );
}