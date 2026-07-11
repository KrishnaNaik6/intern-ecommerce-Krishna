import { api } from "@/lib/axios";
import {
  AuthResponse,
  RegisterRequest,
} from "../types/auth";

export async function register(
  data: RegisterRequest,
): Promise<AuthResponse> {
  const response = await api.post(
    "/auth/register",
    data,
  );

  return response.data;
}