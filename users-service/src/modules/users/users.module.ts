import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@Entities/user.entity';
import { User2Roles } from '@Entities/user-2-roles.entity';
import { Role } from '@Entities/role.entity';
import { UsersService } from '@Modules/users/users.service';
import { UsersController } from '@Modules/users/users.controller';
import { UsedToken } from '@Entities/used-token.entity';

/**
 * Модуль для работы с пользователями
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UsedToken,
      Role,
      User2Roles
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
