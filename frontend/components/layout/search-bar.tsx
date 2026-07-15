import { Search } from "lucide-react";

export function SearchBar() {
    return (
        <div className="flex items-center space-x-2">
            <Search className="size-4" />
            <input
                type="text"
                placeholder="Search products..."
                className="border border-gray-300 rounded-md p-2"
            />
        </div>
    );
}