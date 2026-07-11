import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        {
            message:
                'Password must contain uppercase, lowercase, number and speciall character',
        }
    )
    password!: string;
}
