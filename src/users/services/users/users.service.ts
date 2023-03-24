import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    const users = this.userRepository.find();
    if (users) return (await users).map((user) => new SerializedUser(user));
    else {
      throw new HttpException('table is empty', HttpStatus.NOT_FOUND);
    }
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (user) return new SerializedUser(user);
    else
      throw new HttpException(
        'No user found by provided username',
        HttpStatus.NOT_FOUND,
      );
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async getUserById(id: number) {
    const user = await this.userRepository.find({ where: { id } });
    if (user) return user;
    else {
      throw new HttpException(
        'No user found by provided id',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    console.log(password);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }
}

// getUsers() {
//   return this.users.map((user) => new SerializedUser(user));
// }

// getUserByUsername(username: string) {
//   return this.users.find((user) => user.username === username);
// }

// getUserById(id: number) {
//   return this.users.find((user) => user.id === id);
// }
