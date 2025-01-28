import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './config/db.config';
import { MatcherModule } from './modules/matcher/matcher.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DBConfig,
    }),
    AuthModule,
    MatcherModule,
    UserModule
  ],
})
export class AppModule {}
