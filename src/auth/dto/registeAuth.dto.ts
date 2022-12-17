import { IsNotEmpty, IsString } from "class-validator";

export class RegisterAuthDto {
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    email:string;
    @IsNotEmpty()
    @IsString()
    password:string;
}
