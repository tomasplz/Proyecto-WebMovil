import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RegisterModule } from './register/register.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./.env",
      isGlobal: true,
    }),
    RegisterModule,
  ],
})
export class AppModule { }
