"use client";

import Link from "next/link";

import { ProtectedRoute } from "@/components/auth/potected-route";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { PageLoader } from "@/components/shared/page-loader";
import { Button } from "@/components/ui/button";

import { OrderList } from "@/features/orders/components/order-list";
import { useOrders } from "@/features/orders/hooks/use-orders";

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}

function OrdersContent() {
  const {
    data: orders,
    isPending,
    isError,
    error,
  } = useOrders();

  if (isPending) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message={(error as Error).message}
      />
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        title="No Orders Yet"
        description="You haven't placed any orders yet."
        action={
          <Link href="/products">
            <Button>
              Browse Products
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        My Orders
      </h1>

      <OrderList orders={orders} />
    </div>
  );
}
