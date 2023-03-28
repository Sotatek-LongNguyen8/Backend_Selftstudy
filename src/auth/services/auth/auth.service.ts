import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log('Inside validateUser');
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      const matched = comparePasswords(password, userDB.password);
      if (matched) {
        console.log('User Validation Success');
        return userDB;
      } else {
        console.log('Passwords do not match');
        return null;
      }
    }
    console.log('User Validation Failed');
    return null;
  }

  async login(user: any) {
    const payload = { name: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
