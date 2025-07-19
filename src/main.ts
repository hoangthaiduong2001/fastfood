import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const configService = new ConfigService();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //xoá filed dư
      forbidNonWhitelisted: true, //thông báo lỗi nếu có filed dư
      transform: true, //chuyển payload thành instance cảu dto
      transformOptions: {
        enableImplicitConversion: true, //cho phép chuyển dữ liệu của filed(vd: string to number)
      },
    }),
  );
  const port = configService.get<number>('DB_PORT') ?? 3000;
  logger.log(`Server started on port ${port}`);
  await app.listen(port);
}
bootstrap();
