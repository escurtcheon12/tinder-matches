import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { User } from '../dtos/user.response.dto';

import { ResponseDto } from 'src/common/enums/dto';
import { io, Socket } from 'socket.io-client';

export class UserClient implements OnModuleInit {
  public socketClient: Socket;

  constructor() {
    this.socketClient = io('http://localhost:5001');
  }

  onModuleInit()
  {
    // this.socketClient.on('connection', (socket: Socket) => {
    //   console.log('my connection', socket.id);
    // })
    this.socketClient.on('connect', () => {
      console.log('Connected to server with ID:', this.socketClient.id);
    });

    this.findAllUsers();
  }

  private findAllUsers(): void {
    this.socketClient.on('users', (socket) => {
      console.log("users", socket);
    });
  }

  // @Get('/')
  // async findAll(@Request() request): Promise<ResponseDto<User & { token: string }>> {
  //   console.log('requesttt', request['user']);
  //   return {
  //     message: 'success',
  //     result: {
  //       id: 1,
  //       email: 'r',
  //       phone: '0',
  //       token: '123',
  //     },
  //   };
  // }
}
