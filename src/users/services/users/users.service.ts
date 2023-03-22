import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      username: 'long',
      password: 'long',
    },
    {
      username: 'long1',
      password: 'long1',
    },
    {
      username: 'long2',
      password: 'long2',
    },
    {
      username: 'long3',
      password: 'long3',
    },
  ];
  getUsers() {
    return this.users.map((user) => plainToClass(SerializedUser, user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
