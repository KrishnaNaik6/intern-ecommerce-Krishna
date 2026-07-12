import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export function OrderStatus({ status }: Props) {
  const variants = {
    PENDING: "secondary",
    PLACED: "default",
    PAID: "default",
    SHIPPED: "outline",
    DELIVERED: "default",
    CANCELLED: "destructive",
  } as const;

  return (
    <Badge variant={variants[status as keyof typeof variants] ?? "secondary"}>
      {status}
    </Badge>
  );
}