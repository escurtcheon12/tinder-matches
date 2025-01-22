import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth.service.interface';
import { LoginRequestDto, RegisterRequestDto } from '../dtos/auth.request.dto';
import { IUserRepository } from 'src/modules/user/repositories/user.interface.repository';
import { User } from 'src/modules/user/dtos/user.response.dto';
import { UserEntity } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

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

      return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        token: jwtSign,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async register(request: RegisterRequestDto): Promise<boolean> {
    try {
      const { username, email, phone, password, re_password } = request;

      if (password != re_password)
        throw new BadRequestException(
          'Password should same with repeat password',
        );

      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltOrRounds);

      const userEntity = new UserEntity();
      userEntity.username = username;
      userEntity.email = email;
      userEntity.phone = phone;
      userEntity.password = hashPassword;

      await this.userRepository.save(userEntity);

      return true;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
