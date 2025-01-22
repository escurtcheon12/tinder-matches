import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { IAuthService } from './services/auth.service.interface';
import { AuthService } from './services/auth.service';
import { IUserRepository } from 'src/modules/user/repositories/user.interface.repository';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_TIME'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  exports: [IAuthService],
})
export class AuthModule {}
