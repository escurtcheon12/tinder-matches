import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseExceptionFilter } from './common/exceptions/database-exception.filter';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new DatabaseExceptionFilter());
  app.setGlobalPrefix(configService.get('api.prefix') || 'api/');

  await app.listen(process.env.PORT ?? 5001);
}
bootstrap().then(() => {
  Logger.debug(`App Started`, process.env.PORT || 5001);
});
