"use client"

import { QUERY_KEYS } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getMe } from "../api/me"

export function useMe() {
    return useQuery({
        queryKey: QUERY_KEYS.ME,
        queryFn: getMe,
    })
}