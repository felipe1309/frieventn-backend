import {
  Controller,
  UseGuards,
  Get,
  Request,
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { ProfileService } from './profile.service';
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getData(@Request() req) {
    const user = await this.profileService.getData(req.user.id);
    if (!user) throw new HttpException('USER_NOT_FOUND', 404);
    return user;
  }
}
