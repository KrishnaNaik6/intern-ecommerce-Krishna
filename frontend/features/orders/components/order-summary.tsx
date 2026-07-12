interface Props {
  totalItems: number;
  totalAmount: number;
}

export function OrderSummary({
  totalItems,
  totalAmount,
}: Props) {
  return (
    <div className="rounded-xl border p-6">

      <h2 className="mb-4 text-xl font-bold">
        Summary
      </h2>

      <div className="flex justify-between">

        <span>Items</span>

        <span>{totalItems}</span>

      </div>

      <div className="mt-4 flex justify-between text-xl font-bold">

        <span>Total</span>

        <span>
          $
          {Number(totalAmount).toFixed(2)}
        </span>

      </div>

    </div>
  );
}