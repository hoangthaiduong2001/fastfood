import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const configService = new ConfigService();
  const port = configService.get<number>('DB_PORT') ?? 3000;
  logger.log(`Server started on port ${port}`);
  await app.listen(port);
}
bootstrap();
