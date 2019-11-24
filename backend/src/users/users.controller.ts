import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

  @UseGuards(AuthGuard(''))
  @Get('profile')
  getProfile(@Request() req): Promise<string> {
    return req.user;
  }
}
