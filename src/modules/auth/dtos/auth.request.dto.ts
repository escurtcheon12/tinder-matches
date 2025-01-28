import {
  IsBoolean,
  IsEmail, IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { UserGender } from '../../../common/enums/global';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsPhoneNumber('ID')
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber("ID")
  phone: string;

  @IsNotEmpty()
  @IsEnum(UserGender, {
    message: "Gender should filled with male = 0 and female = 1"
  })
  gender: number;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  repeat_password: string;
}
