import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsedTokensService } from '@Modules/used-tokens/used-tokens.service';
import { UsedToken } from '@Entities/used-token.entity';

/**
 * Модуль для работы с использованными токенами
 */
@Module({
  imports: [TypeOrmModule.forFeature([UsedToken])],
  providers: [UsedTokensService],
  exports: [UsedTokensService],
})
export class UsedTokensModule {}
