import axios from "axios";
import { useAuthStore } from "@/store/auth-store";
import { isTokenExpired } from "./utils";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    if (isTokenExpired(token)) {
      useAuthStore.getState().logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(new axios.Cancel("Token expired"));
    }
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("[Axios Response Interceptor Error]:", {
      status: error.response?.status,
      url: error.config?.url,
      hasAuthStore: !!useAuthStore,
      authState: useAuthStore?.getState ? useAuthStore.getState() : null
    });

    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes("/auth/login");
      const { logout, isAuthenticated } = useAuthStore.getState();

      console.log("[Axios Response Interceptor 401 Details]:", {
        isLoginRequest,
        isAuthenticated
      });

      if (!isLoginRequest && isAuthenticated) {
        console.log("[Axios Response Interceptor]: Session expired, logging out and redirecting to /login...");
        logout();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);