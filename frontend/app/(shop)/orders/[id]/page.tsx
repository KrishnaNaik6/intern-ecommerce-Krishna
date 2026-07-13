"use client";

import { useParams } from "next/navigation";

import { ProtectedRoute } from "@/components/auth/potected-route"; 
import { ErrorMessage } from "@/components/shared/error-message";
import { PageLoader } from "@/components/shared/page-loader";

import { OrderDetails } from "@/features/orders/components/order-details";
import { useOrder } from "@/features/orders/hooks/use-order";

export default function OrderPage() {
  return (
    <ProtectedRoute>
      <OrderContent />
    </ProtectedRoute>
  );
}

function OrderContent() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: order,
    isPending,
    isError,
    error,
  } = useOrder(id);

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

  if (!order) {
    return (
      <ErrorMessage
        message="Order not found."
      />
    );
  }

  return <OrderDetails order={order} />;
}