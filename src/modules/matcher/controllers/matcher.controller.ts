import { Controller, Get, Inject, OnModuleInit, Post, Request } from '@nestjs/common';
import { ResponseDto } from '../../../common/enums/dto';
import { StatusMessage } from '../../../common/enums/global';
import { io, Socket } from 'socket.io-client';
import { IMatcherService } from '../services/matcher.service.interface';

@Controller('matcher')
export class MatcherController {
  constructor(
    @Inject(IMatcherService)
    private readonly matcherService: IMatcherService,
  ) {
  }

  @Post('/find')
  async findOppositeMatch(@Request() request) {
    const id: number = request.user.id;

    const result = await this.matcherService.findOppositesMatch(id);

    return {
      message: StatusMessage.GET_OPPOSITE_MATCH_OK,
      result: 123,
    };
  }
}
