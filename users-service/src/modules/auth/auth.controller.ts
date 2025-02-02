import { Controller } from "@nestjs/common";

import { AuthService } from "@Modules/auth/auth.service";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import {
  AuthRequestDTO,
  AutoServiceCmd,
  type LogoutRequestDTO,
  type JWTTokens
} from "@DTOs/auth.dto";
import type { JWTUser } from "@DTOs/users.dto";

@Controller()
export class AuthController {
  public constructor(private readonly _authService: AuthService) {}

  /**
   * Производит JWT авторизацию существующего пользователя в бд
   */
  @MessagePattern(AutoServiceCmd.LOGIN)
  public login(
    @Payload() reqDTO: AuthRequestDTO,
  ): Promise<JWTTokens> {
    return this._authService.login(reqDTO);
  }

  /**
   * Регистрирует пользователя с уникальным email
   */
  @MessagePattern(AutoServiceCmd.REGISTER)
  public register(
    @Payload() reqDTO: AuthRequestDTO,
  ): Promise<JWTTokens> {
    return this._authService.register(reqDTO);
  }

  /**
   * Обновляет токен доступа и токен обновления для пользователя
   */
  @MessagePattern(AutoServiceCmd.REFRESH)
  public refresh(
    @Payload() reqDTO: Partial<JWTTokens>,
  ): Promise<JWTTokens> {
    return this._authService.refresh(reqDTO);
  }

  /**
   * Выходит из аккаунта текущего пользователя
   */
  @MessagePattern(AutoServiceCmd.LOGOUT)
  public logout(
    @Payload() reqDTO: LogoutRequestDTO,
  ): Promise<RpcException> {
    return this._authService.logout(reqDTO);
  }

  /**
   * Проверяет валидность JWT токена доступа
   */
  @MessagePattern(AutoServiceCmd.CHECK_ACCESS)
  public checkAuth(
    @Payload() reqDTO: JWTTokens,
  ): Promise<JWTUser> {
    return this._authService.checkAccess(reqDTO);
  }
}