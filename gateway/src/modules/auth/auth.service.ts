import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

import { MsNames } from "@Modules/ms/ms.types";
import {
  AuthRequestDTO,
  AutoServiceCmd,
  JWTTokenType,
  type LogoutRequestDTO,
  type JWTTokens
} from "@Types/auth.types";
import type { JWTUser } from "@Types/users.types";

@Injectable()
export class AuthService {
  private readonly _frontendHost: string;

  private readonly _accessCookieExpiresIn: number;

  private readonly _refreshCookieExpiresIn: number;

  public constructor(
    @Inject(MsNames.USERS) private readonly _clientProxy: ClientProxy,

    private readonly _configService: ConfigService
  ) {
    this._frontendHost = this._configService.get('fronted.host') || '';
    this._accessCookieExpiresIn = this._configService.get(
      'microservices.users.access-expires-in'
    ) ?? 0;
    this._refreshCookieExpiresIn = this._configService.get(
      'microservices.users.refresh-expires-in'
    ) ?? 0;
  }

  /**
   * Производит JWT авторизацию существующего пользователя в бд
   */
  public async login(
    reqDTO: AuthRequestDTO,
    res: Response
  ): Promise<void> {
    const result = await firstValueFrom(
      this._clientProxy.send<JWTTokens, AuthRequestDTO>(AutoServiceCmd.LOGIN, reqDTO),
    );

    this._setCookieTokens(result, res);

    const response = new HttpException('Успешная авторизация', HttpStatus.OK);
    res.send(response);
  }

  /**
   * Регистрирует пользователя с уникальным email
   */
  public async register(
    reqDTO: AuthRequestDTO,
    res: Response
  ): Promise<void> {
    const result = await firstValueFrom(
      this._clientProxy.send<JWTTokens, AuthRequestDTO>(AutoServiceCmd.REGISTER, reqDTO),
    );

    this._setCookieTokens(result, res);

    const response = new HttpException('Успешная регистрация', HttpStatus.OK);
    res.send(response);
  }

  /**
   * Обновляет токен доступа и токен обновления для пользователя
   */
  public async refresh(
    reqDTO: Request,
    res: Response
  ): Promise<void> {
    const tokens = this.getCookieTokens(reqDTO);

    const result = await firstValueFrom(
      this._clientProxy.send<JWTTokens, Partial<JWTTokens>>(AutoServiceCmd.REFRESH, tokens),
    );

    this._setCookieTokens(result, res);

    const response = new HttpException('Успешное обновление сессии', HttpStatus.OK);
    res.send(response);
  }

  /**
   * Выходит из аккаунта текущего пользователя
   */
  public async logout(
    reqDTO: Request,
    res: Response,
    user: JWTUser
  ): Promise<void> {
    const tokens = this.getCookieTokens(reqDTO);

    await firstValueFrom(
      this._clientProxy.send<RpcException, LogoutRequestDTO>(
        AutoServiceCmd.LOGOUT, { tokens, user }
      ),
    );

    this._deleteCookieTokens(res);

    const response = new HttpException('Успешный выход из аккаунта', HttpStatus.OK);
    res.send(response);
  }

  /**
   * Проверяет валидность JWT токена доступа
   */
  public checkAccess(
    tokens: Partial<JWTTokens>,
  ): Promise<JWTUser> {
    return firstValueFrom(
      this._clientProxy.send<JWTUser, Partial<JWTTokens>>(
        AutoServiceCmd.CHECK_ACCESS, tokens
      ),
    );
  }

  /**
   * Возвращает токены из куки браузера
   */
  public getCookieTokens(req: Request): Partial<JWTTokens> {
    const accessToken = req.cookies?.[JWTTokenType.ACCESS_TOKEN];
    const refreshToken = req.cookies?.[JWTTokenType.REFRESH_TOKEN];

    return { accessToken, refreshToken }
  }

  /**
   * Устанавливает в куки браузера JWT токены
   */
  private _setCookieTokens(
    tokens: JWTTokens,
    res: Response
  ): void {
    const { accessToken, refreshToken } = tokens;

    res.cookie(JWTTokenType.ACCESS_TOKEN, accessToken, {
      domain: this._frontendHost,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: this._accessCookieExpiresIn,
    });
    res.cookie(JWTTokenType.REFRESH_TOKEN, refreshToken, {
      domain: this._frontendHost,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: this._refreshCookieExpiresIn,
    });
  }

  /**
   * Удаляет из куки браузера JWT токены
   */
  private _deleteCookieTokens(res: Response): void {
    res.clearCookie(JWTTokenType.ACCESS_TOKEN, {
      domain: this._frontendHost,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: this._accessCookieExpiresIn,
    });
    res.clearCookie(JWTTokenType.REFRESH_TOKEN, {
      domain: this._frontendHost,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: this._refreshCookieExpiresIn,
    });
  }
}