import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import type { Request, Response } from 'express';

import { AuthService } from "@Modules/auth/auth.service";
import { AuthRequestDTO, AutoServiceCmd } from "@Types/auth.types";
import { JWTUserDecorator } from "@Decorators/jwt-user.decorator";
import { JWTUser } from "@Types/users.types";

@Controller('api/auth')
export class AuthController {
  public constructor(private readonly _authService: AuthService) {}

  /**
   * Производит JWT авторизацию существующего пользователя в бд
   */
  @Post(AutoServiceCmd.LOGIN)
  public login(
    @Body() reqDTO: AuthRequestDTO,
    @Res() res: Response,
  ): Promise<void> {
    return this._authService.login(reqDTO, res);
  }

  /**
   * Регистрирует пользователя с уникальным email
   */
  @Post(AutoServiceCmd.REGISTER)
  public register(
    @Body() reqDTO: AuthRequestDTO,
    @Res() res: Response,
  ): Promise<void> {
    return this._authService.register(reqDTO, res);
  }

  /**
   * Обновляет токен доступа и токен обновления для пользователя
   */
  @Post(AutoServiceCmd.REFRESH)
  public refresh(
    @Req() reqDTO: Request,
    @Res() res: Response,
  ): Promise<void> {
    return this._authService.refresh(reqDTO, res);
  }

  /**
   * Выходит из аккаунта текущего пользователя
   */
  @Post(AutoServiceCmd.LOGOUT)
  public logout(
    @Req() reqDTO: Request,
    @Res() res: Response,
    @JWTUserDecorator() user: JWTUser,
  ): Promise<void> {
    return this._authService.logout(reqDTO, res, user);
  }
}