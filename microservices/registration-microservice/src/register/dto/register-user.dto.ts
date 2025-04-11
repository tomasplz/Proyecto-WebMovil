import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;
} 