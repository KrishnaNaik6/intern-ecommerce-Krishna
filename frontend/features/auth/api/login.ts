import { api } from "@/lib/axios";
import {
  AuthResponse,
  LoginRequest,
} from "../types/auth";

export async function login(
  data: LoginRequest,
): Promise<AuthResponse> {
  const response = await api.post(
    "/auth/login",
    data,
  );

  return response.data;
}