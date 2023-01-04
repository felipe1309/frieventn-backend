import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/registeAuth.dto';
import { LogInAuthDto } from './dto/logIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    return await this.authService.register(registerAuthDto);
  }
  @Post('logIn')
  async logIn(@Body() logInAuthDto:LogInAuthDto) {
    return this.authService.logIn(logInAuthDto)
  }
  @Get('pepe')
  pepe() {
    return 'el pepe'
  }
}
