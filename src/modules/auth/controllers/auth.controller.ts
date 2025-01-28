import { Body, Controller, Get, Inject, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginRequestDto, RegisterRequestDto } from '../dtos/auth.request.dto';
import { IAuthService } from '../services/auth.service.interface';
import { ResponseDto } from 'src/common/enums/dto';
import { User } from 'src/modules/user/dtos/user.response.dto';
import { StatusMessage } from 'src/common/enums/global';
import { JwtGuard } from 'src/common/guards/jwt.guard';

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService)
    private readonly authService: AuthService,
  ) {
  }

  @Public()
  @Post('/login')
  async login(
    @Request() request,
    @Body() body: LoginRequestDto,
  ): Promise<ResponseDto<User & { token: string }>> {
    const result = await this.authService.login(body);
    // request.session.user =
    //   {
    //     id: result.id,
    //     username: result.username,
    //   };

    return {
      message: StatusMessage.LOGIN_OK,
      result,
    };
  }

  @Public()
  @Post('/register')
  async register(@Body() request: RegisterRequestDto) {
    const result = await this.authService.register(request);

    return {
      message: StatusMessage.CREATE_OK,
      result,
    };
  }

  @UseGuards(JwtGuard)
  @Get('/home')
  async test(@Body() req) {
    return {
      message: StatusMessage.CREATE_OK,
    };
  }
}
