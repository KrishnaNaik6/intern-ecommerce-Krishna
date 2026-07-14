import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import {
  AuthResponse,
  RegisterRequest,
} from "../types/auth";

export async function register(
  data: RegisterRequest,
) {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    data,
  );
  console.log("registration response data", response)

  return response.data;
}