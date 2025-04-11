import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [RegisterController],
    providers: [RegisterService, PrismaService],
    exports: [RegisterService],
})
export class RegisterModule { } 