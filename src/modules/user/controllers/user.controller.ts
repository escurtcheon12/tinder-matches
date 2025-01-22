import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {  User } from '../dtos/user.response.dto';
import { UserService } from '../services/user.service';
import { FindAllUserRequestDto } from '../dtos/user.request.dto';
import { ResponseDto } from 'src/common/enums/dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async findAll(@Body() request: FindAllUserRequestDto): Promise<ResponseDto<User & { token: string }>> {
    return {
      message: 'success',
      result: {
        id: 1,
        email: 'r',
        phone: '0',
        token: '123',
      },
    };
  }

  @Get('/:id')
  async findById(@Param() id): Promise<ResponseDto<User>> {
    return {
      message: 'success',
      result: {
        id: 1,
        email: 'r',
        phone: '0',
      },
    };
  }

  @Post('/create')
  async create(@Param() id): Promise<ResponseDto<User>> {
    return {
      message: 'success',
      result: {
        id: 1,
        email: 'r',
        phone: '0',
      },
    };
  }

  @Post('/update/:id')
  async update(@Body() body, @Param() id): Promise<ResponseDto<User>> {
    return {
      message: 'success',
      result: {
        id: 1,
        email: 'r',
        phone: '0',
      },
    };
  }
}
