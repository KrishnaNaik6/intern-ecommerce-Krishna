"use client";

import { useOrder } from "@/features/orders/hooks/use-order";

import { OrderDetails } from "@/features/orders/components/order-details";
import { ProtectedRoute } from "@/components/auth/potected-route";

interface Props {
  params: {
    id: string;
  };
}

export default function OrderPage({
  params,
}: Props) {
  const {
    data,
    isPending,
  } = useOrder(params.id);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Order not found.</div>;
  }

  return (
    <ProtectedRoute>

      <OrderDetails
        order={data}
      />
    </ProtectedRoute>
  );
}