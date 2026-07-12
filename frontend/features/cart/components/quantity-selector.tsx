"use client";

import { Button } from "@/components/ui/button";

interface Props {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

export function QuantitySelector({
    quantity,
    onIncrease,
    onDecrease,
}: Props) {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={onDecrease}
            >
                -
            </Button>

            <span className="w-8 text-center">
                {quantity}
            </span>

            <Button
                variant="outline"
                size="icon"
                onClick={onIncrease}
            >
                +
            </Button>
        </div>
    );
}