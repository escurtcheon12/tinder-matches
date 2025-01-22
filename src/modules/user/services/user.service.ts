import { Injectable } from '@nestjs/common';
import { UserServiceInterface } from './user.service.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
}
