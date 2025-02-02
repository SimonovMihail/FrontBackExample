import { Module } from "@nestjs/common";

import { AuthController } from "@Modules/auth/auth.controller";
import { AuthService } from "@Modules/auth/auth.service";
import { MsModule } from "@Modules/ms/ms.module";

/**
 * Модуль для взаимодействия с авторизацией
 */
@Module({
  imports: [MsModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
