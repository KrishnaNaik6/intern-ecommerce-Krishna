import { api } from "@/lib/axios";

interface ForgotPasswordDto {
    email: string;
}

export async function forgotPassword(
    dto: ForgotPasswordDto,
) {
    const response = await api.post(
        "/auth/forgot-password",
        dto,
    );

    return response.data;
}