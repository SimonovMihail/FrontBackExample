import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Request } from 'express'

import { RolesDecorator } from '@Decorators/roles.decorator'
import { UserDTO } from '@Types/users.types'

/**
 * Guard, который сопоставляет роли текущего пользователя и роли доступа обработчика роута
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()

    // Роли доступа обработчика роута
    const roles = this.reflector.get(RolesDecorator, context.getHandler())

    // Текущий пользователь из запроса
    const user: UserDTO = request['user']
    const userRoles = user?.roles.map(({ name }) => name)

    const isMatchRoles = roles?.some((role) => userRoles?.includes(role))

    // Если у обработчика роута не указаны роли доступа или роли совпали с ролями пользователя, то разрешаем доступ
    if (isMatchRoles || !roles || roles?.length === 0) {
      return true
    }

    // Иначе выбрасываем исключение
    throw new HttpException('Нет прав!', HttpStatus.FORBIDDEN)
  }
}