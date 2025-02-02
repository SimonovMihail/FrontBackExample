import {
  HttpException,
  HttpStatus,
  Injectable,
  type NestMiddleware,
} from '@nestjs/common';
import type { NextFunction } from 'express';
import type { Request, Response } from 'express';

import { AuthService } from '@Modules/auth/auth.service';

/**
 * JWT миддлвар для проверки авторизации у пользователей из запросов
 */
@Injectable()
export class JWTMiddleware implements NestMiddleware {
  public constructor(private readonly _authService: AuthService) {}

  async use(request: Request, _: Response, next: NextFunction) {
    const unauthorizedError = new HttpException(
      'Пользователь не авторизован',
      HttpStatus.UNAUTHORIZED,
    );

    try {
      const tokens = this._authService.getCookieTokens(request)

      // Если токены не передали
      if (!tokens.accessToken || !tokens.refreshToken) {
        throw unauthorizedError
      }

      const user = await this._authService.checkAccess(tokens);

      if (!user) throw unauthorizedError

      // Если токен актуален, то добавляем пользователя в обЪект запроса
      request['user'] = user;

      next();
    } catch (error) {
      throw unauthorizedError
    }
  }
}
