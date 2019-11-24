import { User, UserClean } from '../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {

  async validateUser(
    pass: string,
    userFromBackend: User
  ): Promise<UserClean | null> {

    if (userFromBackend?.password === pass) {
      const { password, ...result } = userFromBackend;
      return result;
    }
    return null;
  }
}
