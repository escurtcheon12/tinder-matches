import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { UserConnection } from '../../../common/enums/global';

export class UserLoginRequestDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserRegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  repeat_password: string;
}

export class FindAllUserRequestDto {
  @IsNotEmpty()
  @Min(5)
  @IsInt()
  limit: number;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  page: number;

  @IsOptional()
  @IsString()
  search: string;
}

export class FindAllByConnectionRequestDto {
  @IsNotEmpty()
  @Min(5)
  @IsInt()
  limit: number;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  page: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsEnum(UserConnection, {
    message: 'User connection status filled with Online = 1 and Offline = 2',
  })
  status: number;
}
