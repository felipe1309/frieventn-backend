import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { consts } from 'src/const';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: consts.JWT_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
})
export class AuthModule {}
