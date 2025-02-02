import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { UsersTypeOrm } from "@Modules/type-orm/type-orm.module";
import { getConfig } from "@Utils/getConfig";
import { UsersModule } from "@Modules/users/users.module";
import { AuthModule } from "./auth/auth.module";

/**
 * Основной модуль микросервиса
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
    }),

    UsersTypeOrm,
    UsersModule,
    AuthModule,
  ]
})
export class AppModule {}