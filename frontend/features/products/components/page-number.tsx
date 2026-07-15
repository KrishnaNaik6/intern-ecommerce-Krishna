import { Button } from "@/components/ui/button";

export function PageNumber({ page, totalPages, onPageChange }: { page: number, totalPages: number, onPageChange: (page: number) => void }) {
    return (
        <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <Button
                    key={pageNumber}
                    variant={page === pageNumber ? "default" : "outline"}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </Button>
            ))}
        </div>
    );
}