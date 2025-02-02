import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

/**
 * Декоратор JWTUserDecorator используется в параметрах обработчика роута - достает текущего пользователя из запроса
 */
export const JWTUserDecorator = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request['user'];
  },
);
