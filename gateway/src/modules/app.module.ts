import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { getConfig } from '@Utils/getConfig';
import { AuthModule } from '@Modules/auth/auth.module';
import { JWTMiddleware } from '@Middlewares/jwt.middleware';
import { UsersModule } from '@Modules/users/users.module';

/**
 * Основной модуль gateway
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
    }),

    AuthModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JWTMiddleware)
      // Убираем роуты авторизации из обработки миддлваром
      .exclude(
        { path: 'api/auth/login', method: RequestMethod.POST },
        { path: 'api/auth/register', method: RequestMethod.POST },
        { path: 'api/auth/refresh', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}

