import Link from "next/link";

import { NavLinks } from "./nav-links";
import { CartBadge } from "./cart-badge";
import { UserMenu } from "./user-menu";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-2xl font-bold"
        >
          ShopHub
        </Link>

        <NavLinks />

        <div className="flex items-center gap-6">
          <CartBadge />
          <UserMenu />
        </div>

      </div>
    </header>
  );
}