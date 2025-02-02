import { Module } from "@nestjs/common";

import { MsModule } from "@Modules/ms/ms.module";
import { UsersController } from "@Modules/users/users.controller";
import { UsersService } from "@Modules/users/users.service";
import { AuthModule } from "@Modules/auth/auth.module";

/**
 * Модуль для взаимодействия с пользователями
 */
@Module({
  imports: [MsModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
