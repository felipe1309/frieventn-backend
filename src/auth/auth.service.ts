import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDto } from './dto/registeAuth.dto';
import { LogInAuthDto } from './dto/logIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(RegisterAuthDto: RegisterAuthDto) {
    const user = await this.usersService.create(RegisterAuthDto);
    const token = this.jwtService.sign({ id: user._id });
    return { value: token };
  }
  async logIn(logInAuthDto: LogInAuthDto) {
    const user = await this.usersService.findUserForEmail(logInAuthDto.email);
    if (!user) throw new HttpException('USER_NOT_FOUND', 404);
    const checkPassword = await this.usersService.checkPassword(
      logInAuthDto.password,
      user.password,
    );
    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);
    const token = this.jwtService.sign({ id: user._id });
    return {
      value: token
    };
  }
}
