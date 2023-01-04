import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { consts } from 'src/const';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: consts.JWT_SECRET,
      signOptions: {
        expiresIn: "7d",
      },
    }),
  ],
  providers: [
    AuthService
  ],
})
export class AuthModule {}
