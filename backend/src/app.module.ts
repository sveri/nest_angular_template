import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(),
    AuthModule, UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule { }
