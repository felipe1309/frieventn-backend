import { IsNotEmpty, IsString } from 'class-validator';

export class LogInAuthDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
