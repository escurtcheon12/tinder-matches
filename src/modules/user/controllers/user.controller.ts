import {
  Controller,
  Get,
  Inject,
  Query,
  Request,
} from '@nestjs/common';
import { User } from '../dtos/user.response.dto';
import { UserService } from '../services/user.service';
import {
  FindAllByConnectionRequestDto,
} from '../dtos/user.request.dto';
import { ResponseDto } from 'src/common/enums/dto';
import { IUserService } from '../services/user.service.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserService)
    private readonly userService: UserService,
  ) {
  }

  @Get('/')
  async findAllByConnection(
    @Request() request,
    @Query() body: FindAllByConnectionRequestDto,
  ): Promise<ResponseDto<(User & { connection: number })[]>> {
    const id: number = request.user.id;

    const result = await this.userService.findAllByConnection(id, body);

    return {
      message: 'success',
      result,
    };
  }
}
