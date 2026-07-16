import { IsEmail, IsString } from "class-validator";

export class SendMailDto {
    @IsEmail()
    to: string;
    @IsString()
    subject: string;
    @IsString()
    text?: string;
    @IsString()
    template?: string;
    @IsString()
    context?: {}
}