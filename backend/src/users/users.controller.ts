import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { UserClean, UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';

class UserExistsException extends HttpException {
  constructor() {
    super('User Exists', HttpStatus.CONFLICT);
  }
}

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) { }

  @UseGuards(AuthGuard(''))
  @Get('profile')
  getProfile(@Request() req): Promise<string> {
    return req.user;
  }

  @Post('register')
  async register(@Body() user: User): Promise<UserClean> {
    const existing = await this.userService.userExists(user);
    if (existing) {
      throw new UserExistsException();
    }
    const u = User.fromUser(user);
    const createdUser = this.userService.registerUser(u);
    delete (await createdUser).password;
    Logger.log('Created User');
    return createdUser;
  }
}
