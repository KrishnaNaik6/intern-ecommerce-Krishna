import { ProductDetails } from "@/features/products/components/product-details";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <ProductDetails
      id={Number(id)}
    />
  );
}