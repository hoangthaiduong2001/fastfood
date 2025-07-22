import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { StartTimingMiddleware } from './common/middleware/start-timing.middleware';
import { sequelizeConfig } from './config/sequelize.config';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SequelizeModuleOptions =>
        sequelizeConfig(configService),
    }),
    CategoryModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StartTimingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
