import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from './user.service.interface';
import { IUserRepository } from '../repositories/user.interface.repository';
import { FindAllByConnectionRequestDto } from '../dtos/user.request.dto';
import { User } from '../dtos/user.response.dto';
import { EventsGateway } from '../../matcher/gateway/events.gateway';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(EventsGateway)
    private readonly eventsGateway: EventsGateway,
  ) {}

  async findAllByConnection(
    id: number,
    request: FindAllByConnectionRequestDto,
  ): Promise<(User & { connection: number })[]> {
    const { limit, page, search } = request;

    const users = await this.userRepository.findAll(limit, page, search);

    const connectedUsers = this.eventsGateway.getConnectedUsers();

    const hashConnectedUsers = new Map<number, boolean>();

    connectedUsers.map((user) => hashConnectedUsers.set(user.userId, true));

    const usersWithStatus: { id: number, username: string, connection: number}[] = [];

    for(const user of users) {
        if(user.id == id) continue;

        usersWithStatus.push({
          id: user.id,
          username: user.username,
          connection: hashConnectedUsers.has(user.id) ? 1 : 0,
        });
    }

    return usersWithStatus;
  }
}
