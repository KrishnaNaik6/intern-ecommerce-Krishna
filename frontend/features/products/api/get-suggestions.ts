import { api } from "@/lib/axios";

export default async function getSuggestions({ query }: { query: string }) {
    const res = await api.get(`/products/suggestions?query=${query}`)
    return res.data.data;
}