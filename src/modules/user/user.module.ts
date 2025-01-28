import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { IUserService } from './services/user.service.interface';
import { IUserRepository } from './repositories/user.interface.repository';
import { UserRepository } from './repositories/user.repository';
import { UserClient } from './socket/user.client';
import { EventsGateway } from '../matcher/gateway/events.gateway';

@Module({
  imports: [
    UserClient
  ],
  controllers: [UserController],
  providers: [
    {
      provide: IUserService,
      useClass: UserService,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    EventsGateway,
  ],
})
export class UserModule {}
