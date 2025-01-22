import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

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
  repassword: string;
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
