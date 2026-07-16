import { api } from "@/lib/axios";

interface ResetPasswordDto {
    token: string;
    password: string;
}

export async function resetPassword(
    dto: ResetPasswordDto,
) {
    const response = await api.post(
        "/auth/reset-password",
        dto,
    );

    return response.data;
}