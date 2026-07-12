"use client";

import { useOrders } from "@/features/orders/hooks/use-orders";

export default function OrdersPage() {
  const { data, isPending } = useOrders();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}