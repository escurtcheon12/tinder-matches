import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './config/db.config';

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
  ],
})
export class AppModule {}
