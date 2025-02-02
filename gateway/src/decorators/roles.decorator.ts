import { Reflector } from '@nestjs/core'

import { UserRoleEnum } from '@Types/users.types'

/**
 * Декоратор Roles используется указании прав доступа по ролям в обработчике роута
 */
export const RolesDecorator = Reflector.createDecorator<UserRoleEnum[]>()
