import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<{ accessToken: string }> {
    return this.authService.login(req.user);
  }
}