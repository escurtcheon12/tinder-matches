import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
import { EventsGateway } from '../gateway/events.gateway';
import { UserMatcher } from 'src/common/enums/global';

@Injectable()
export class MatcherService {
  private socketClient: Socket;

  constructor(
    @Inject(EventsGateway)
    private readonly eventsGateway: EventsGateway,
  ) {
    this.socketClient = io('http://localhost:5001');
    this.socketClient.on('connect', () => {
      console.log('WebSocket connected:', this.socketClient.id);
    });
  }

  async findOppositesMatch(id: number) {
    // try {
      const connectedUsers = this.eventsGateway.getConnectedUsers();

      const data = connectedUsers.find((item) => item.userId == id);
      if (this.socketClient.connected) {
        this.socketClient.emit('onMatchConnection', {
          ...data,
          socketId: this.socketClient.id,
          status: UserMatcher.FIND,
        });
      }

      const matchUser = await this.checkForMatcherUser(id);

      if (!matchUser) {
        throw new BadRequestException('No matching user found after 1 minute.');
      }

      console.log('matchUser', matchUser);
      console.log('connectedUsers', connectedUsers);
    // } catch (err) {
    //   return Promise.all(err);
    // }
  }

  private async checkForMatcherUser(id: number) {
    const startTime = Date.now();
    while (Date.now() - startTime < 60000) {
      const matcherUser = this.eventsGateway.getMatchUserByUserId(id);
      if (matcherUser) {
        return matcherUser;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return null;
  }
}
