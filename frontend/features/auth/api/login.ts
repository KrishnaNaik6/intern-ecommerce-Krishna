import { api } from "@/lib/axios";
import type { LoginRequest, AuthResponse } from "../types/auth";
import type { ApiResponse } from "@/types/api";

export async function login(
  data: LoginRequest,
): Promise<AuthResponse> {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    data,
  );

  return response.data.data;
}