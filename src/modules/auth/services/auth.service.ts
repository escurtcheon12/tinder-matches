import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth.service.interface';
import { LoginRequestDto, RegisterRequestDto } from '../dtos/auth.request.dto';
import { IUserRepository } from 'src/modules/user/repositories/user.interface.repository';
import { User } from 'src/modules/user/dtos/user.response.dto';
import { UserEntity } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class AuthService implements IAuthService {
  private socketClient: Socket;

  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {
    this.socketClient = io('http://localhost:5001');
    this.socketClient.on('connect', () => {
      console.log('WebSocket connected:', this.socketClient.id);
    });
  }

  async login(request: LoginRequestDto): Promise<User & { token: string }> {
    try {
      const { phone, password } = request;

      const user = await this.userRepository.findByPhone(phone);

      const payload = { id: user.id };
      const jwtSign = await this.jwtService.signAsync(payload);

      if (!user) throw new BadRequestException('Data not found');

      const IsPasswordMatch = await bcrypt.compare(password, user.password);

      if (!IsPasswordMatch)
        throw new BadRequestException('Username or password is wrong');

      console.log(this.socketClient.id, user.id, user.username);

      if (this.socketClient.connected) {
        this.socketClient.emit('onUserConnection', {
          socketId: this.socketClient.id,
          userId: user.id,
          username: user.username,
          gender: user.gender
        });
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        token: jwtSign,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async register(request: RegisterRequestDto): Promise<boolean> {
    try {
      const { username, email, phone, password, repeat_password, gender } = request;

      if (password != repeat_password)
        throw new BadRequestException(
          'Password should same with repeat password',
        );

      const saltOrRounds = 10;
      const hashPassword: string = await bcrypt.hash(password, saltOrRounds);

      const userEntity = new UserEntity();
      userEntity.username = username;
      userEntity.email = email;
      userEntity.phone = phone;
      userEntity.gender = gender
      userEntity.password = hashPassword;

      await this.userRepository.save(userEntity);

      return true;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
