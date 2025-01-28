import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { findIndex, from, map, Observable } from 'rxjs';
import { OnModuleInit } from '@nestjs/common';
import { UserGender, UserMatcher } from '../../../common/enums/global';

export type TConnectedUser = {
  socketId: string;
  userId: number;
  username: string;
  status: number;
  gender: number;
};

@WebSocketGateway()
export class EventsGateway implements OnModuleInit {
  private connectedUsers: TConnectedUser[] = [];
  private dataMatch: Map<number, number> = new Map();

  @WebSocketServer()
  server: Server;

  onModuleInit(): any {
    this.server.on('connection', (socket) => {
      console.log('Received connection', socket.id);

      socket.on('onUserConnection', (data) => {
        const hashConnectedUsersByUserId: Map<number, TConnectedUser> =
          new Map();

        this.connectedUsers.map((item) =>
          hashConnectedUsersByUserId.set(item.userId, item),
        );

        if (!hashConnectedUsersByUserId.has(data.userId)) {
          this.connectedUsers.push({
            socketId: data.socketId,
            userId: data.userId,
            username: data.username,
            status: UserMatcher.IDDLE,
            gender: data.gender,
          });
        }

        console.log('data=', data, 'connectedUser=', this.connectedUsers);
      });

      socket.on('onMatchConnection', (data) => {
        const findIndexConnUser = this.connectedUsers.findIndex(
          (item) => item.userId == data.userId,
        );
        this.connectedUsers[findIndexConnUser] = {
          ...data,
        };

        const dataFemale = this.connectedUsers.filter(
          (item) =>
            item.gender == UserGender.FEMALE && item.status == UserMatcher.FIND,
        );

        const dataMale = this.connectedUsers.filter(
          (item) =>
            item.gender == UserGender.MALE && item.status == UserMatcher.FIND,
        );

        if (dataMale.length && dataFemale.length) {
          while (dataMale.length > 0 && dataFemale.length > 0) {
            const indexRandomMale = Math.floor(Math.random() * dataMale.length);
            const indexRandomFemale = Math.floor(
              Math.random() * dataFemale.length,
            );

            const findRandomMale = dataMale[indexRandomMale];
            const findRandomFemale = dataFemale[indexRandomFemale];

            this.dataMatch.set(findRandomMale.userId, findRandomFemale.userId);
            this.dataMatch.set(findRandomFemale.userId, findRandomMale.userId);

            // Remove the matched elements from the arrays
            dataMale.splice(indexRandomMale, 1);
            dataFemale.splice(indexRandomFemale, 1);
          }
        }

        console.log("this==", this.dataMatch)
      });

      // Register the disconnect event on the socket
      socket.on('disconnect', (reason) => {
        console.log(`Socket disconnected: ${socket.id}, reason: ${reason}`);

        // Remove disconnected user
        this.connectedUsers = this.connectedUsers.filter(
          (user) => user.socketId !== socket.id,
        );

        // Emit the updated users list
        this.server.emit('users', {
          total: this.connectedUsers.length,
          users: this.connectedUsers,
        });
      });
    });
  }

  getConnectedUsers(): TConnectedUser[] {
    return this.connectedUsers;
  }

  getMatchUserByUserId(userId: number): number {
    return this.dataMatch.get(userId);
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() data: any) {
    this.server.emit('newMessage', {
      message: 'New Message',
      content: data,
    });

    // return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   console.log('events', data);
  //   return from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }

  // @SubscribeMessage('identity')
  // async identity(@MessageBody() data: number): Promise<number> {
  //   console.log('identity', data);
  //   return data;
  // }
}
