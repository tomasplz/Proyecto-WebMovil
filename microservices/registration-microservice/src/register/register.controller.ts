import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) { }

    @Post()
    async createUser(@Body() registerUserDto: RegisterUserDto) {
        try {
            const user = await this.registerService.createUser(registerUserDto);
            return {
                message: 'Usuario creado exitosamente',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get()
    async getUsers() {
        try {
            const users = await this.registerService.findAll();
            return {
                message: 'Usuarios encontrados',
                users: users
            };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}