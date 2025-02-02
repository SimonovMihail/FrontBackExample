import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from '@Modules/auth/auth.service';
import { UsersModule } from '@Modules/users/users.module';
import { UsedTokensModule } from '@Modules/used-tokens/used-tokens.module';
import { AuthController } from '@Modules/auth/auth.controller';

/**
 * Модуль с JWT авторизацией
 */
@Module({
  imports: [JwtModule.register({}), UsersModule, UsedTokensModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
