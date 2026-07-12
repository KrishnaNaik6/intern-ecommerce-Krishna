"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/products",
    label: "Products",
  },
  {
    href: "/orders",
    label: "Orders",
  },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={
            pathname === link.href
              ? "font-semibold"
              : "text-muted-foreground"
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}