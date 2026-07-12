import { ProductDetails } from "@/features/products/components/product-details";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto py-8">
      <ProductDetails id={Number(id)} />
    </div>
  );
}