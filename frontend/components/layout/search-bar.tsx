"use client"

import { Product } from "@/features/products/types/product";
import { useDebouncing } from "@/hooks/use-debouncing";
import { Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import getSuggestions from "@/features/products/api/get-suggestions";
import Link from "next/link";

export function SearchBar() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const debouncedSearch = useDebouncing(search, 300);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            if (debouncedSearch.trim() === "") {
                setProducts([]);
                return;
            }
            try {
                const res = await getSuggestions({ query: debouncedSearch });
                setProducts(res || []);
            } catch (error) {
                console.error("Failed to fetch suggestions:", error);
                setProducts([]);
            }
        }
        fetchProducts();
    }, [debouncedSearch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full max-w-xs md:max-w-sm">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full rounded-full border border-gray-200 py-1.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                />
            </div>

            {isOpen && search.trim() !== "" && products.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-lg border bg-white py-1.5 shadow-lg">
                    {products.map((item) => (
                        <Link
                            key={item.id}
                            href={`/products/${item.id}`}
                            onClick={() => {
                                setSearch("");
                                setIsOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}