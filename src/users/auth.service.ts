import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);

    if (users.length) {
      return new BadRequestException('user is not found');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = await this.userService.create(email, result);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      return new NotFoundException('user not found');
    }

    const [salt, hash] = user.password.split('.');
    const output = (await scrypt(password, salt, 32)) as Buffer;

    if (hash !== output.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}
