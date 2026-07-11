import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(2)
        .max(100),

    email: z.email(),

    password: z
        .string()
        .min(8)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
            "Password must contain uppercase, lowercase, number and special character",
        ),
});

export type RegisterFormValues =
    z.infer<typeof registerSchema>;