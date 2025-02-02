import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  JwtService,
  type JwtVerifyOptions,
  type JwtSignOptions,
} from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

import { AuthRequestDTO, JWTTokens, type LogoutRequestDTO } from '@DTOs/auth.dto';
import { RpcException } from '@nestjs/microservices';
import { type JWTUser, UserRoleEnum } from '@DTOs/users.dto';
import { UsersService } from '@Modules/users/users.service';
import { UsedTokensService } from '@Modules/used-tokens/used-tokens.service';
import { User } from '@Entities/user.entity';

@Injectable()
export class AuthService {
  private readonly _accessJWTSecret: string;
  private readonly _refreshJWTSecret: string;

  private readonly _accessExpiresIn: string;
  private readonly _refreshExpiresIn: string;

  constructor(
    private readonly _configService: ConfigService,

    private readonly _jwtService: JwtService,

    private readonly _usersService: UsersService,

    private readonly _usedTokensService: UsedTokensService,
  ) {
    this._accessJWTSecret = this._configService.get<string>(
      'microservices.users.auth.access-token.jwt-secret',
    ) || '';
    this._refreshJWTSecret = this._configService.get<string>(
      'microservices.users.auth.refresh-token.jwt-secret',
    ) || '';

    this._accessExpiresIn = this._configService.get<string>(
      'microservices.users.auth.access-token.jwt-expires-in',
    ) || '1s';
    this._refreshExpiresIn = this._configService.get<string>(
      'microservices.users.auth.refresh-token.jwt-expires-in',
    ) || '1s';
  }

  /**
   * Производит JWT авторизацию существующего пользователя в бд
   */
  public async login(
    reqDTO: AuthRequestDTO
  ): Promise<JWTTokens> {
    const { email, password } = reqDTO;

    const DBUser = await this._usersService.getUserByEmail(email);
    // Если логин не совпал - отправляем ошибку
    if (!DBUser) {
      throw new RpcException({
        message: 'Ошибка авторизации',
        status: HttpStatus.BAD_REQUEST
      });
    }

    const isMatchPassword = await bcrypt.compare(password, DBUser.password);
    // Если пароль не совпал - отправляем ошибку
    if (!isMatchPassword) {
      throw new RpcException({
        message: 'Ошибка авторизации',
        status: HttpStatus.BAD_REQUEST
      });
    }

    const tokens = await this._generateTokens(DBUser);

    return tokens
  }

  /**
   * Регистрирует пользователя с уникальным email
   */
  public async register(
    reqDTO: AuthRequestDTO,
  ): Promise<JWTTokens> {
    const existedDBUser = await this._usersService.getUserByEmail(reqDTO.email);

    // Если пользователь с таким email уже существует - отправляем ошибку
    if (existedDBUser) {
      throw new RpcException({
        message: 'Ошибка регистрации',
        status: HttpStatus.BAD_REQUEST
      });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(reqDTO.password, 10);

    // Задаем начальную роль пользователя
    const clientRole = await this._usersService.getRoleByName(UserRoleEnum.CLIENT);

    if (!clientRole) {
      throw new RpcException({
        message: 'Ошибка регистрации',
        status: HttpStatus.BAD_REQUEST
      });
    }

    // Сохраняем пользователя в бд
    const user = await this._usersService.createUser({
      email: reqDTO.email,
      password: hashedPassword,
      roles: [clientRole]
    });

    const tokens = await this._generateTokens(user);

    return tokens
  }

  /**
   * Обновляет токен доступа и токен обновления для пользователя
   */
  public async refresh(
    reqDTO: Partial<JWTTokens>,
  ): Promise<JWTTokens> {
    const { accessToken, refreshToken } = reqDTO;

    if (!accessToken || !refreshToken) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Пользователь не авторизован',
      });
    }

    // Конфиг токена обновления
    const refreshVerifyOptions: JwtVerifyOptions = {
      secret: this._refreshJWTSecret,
      ignoreExpiration: false,
    };

    // Пробуем раскодировать пользователя из токена
    const jwtUser = await this._jwtService
      .verifyAsync<JWTUser>(refreshToken, refreshVerifyOptions)
      .catch(() => {
        throw new RpcException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Пользователь не авторизован',
        });
      });

    // Добавляем токены в таблицу использованных токенов
    await this._usedTokensService.makeTokensUsed(accessToken, refreshToken, jwtUser.id);

    const tokens = await this._generateTokens(jwtUser);

    return tokens
  }

  /**
   * Выходит из аккаунта текущего пользователя (помещает токены в таблицу использованных токенов)
   */
  public async logout(
    reqDTO: LogoutRequestDTO,
  ): Promise<RpcException> {
    const { tokens, user } = reqDTO;

    // Добавляем токены в таблицу использованных токенов
    await this._usedTokensService.makeTokensUsed(
      tokens.accessToken,
      tokens.refreshToken,
      user.id
    );
 
    return new RpcException({
      message: 'Успешный выход из аккаунта',
      statusCode: HttpStatus.OK,
    })
  }

  /**
   * Проверяет валидность JWT токена доступа
   */
  public async checkAccess(
    jwtTokens: JWTTokens,
  ): Promise<JWTUser> {
    const { accessToken } = jwtTokens;

    // Конфиг токена доступа
    const accessTokenOptions: JwtVerifyOptions = {
      secret: this._accessJWTSecret,
      ignoreExpiration: false,
    };

    // Пробуем раскодировать пользователя из токена
    const jwtUser = await this._jwtService.verifyAsync<JWTUser>(
      accessToken,
      accessTokenOptions,
    ).catch(() => {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Пользователь не авторизован',
      });
    })

    // Проверяем, что токен сгенерирован для конкретного пользователя текущей сессии
    const isUsedToken = await this._usedTokensService.isUsedToken(accessToken);
    if (isUsedToken) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return jwtUser;
  }

  /**
   * Генерирует токен доступа и токена обновления для переданного пользователя
   */
  private async _generateTokens(
    user: Pick<User, 'id' | 'email'>,
  ): Promise<JWTTokens> {
    const { id, email } = user;

    // Конфиг токена доступа
    const accessSignOptions: JwtSignOptions = {
      secret: this._accessJWTSecret,
      expiresIn: this._accessExpiresIn,
    };

    // Конфиг токена обновления
    const refreshSignOptions: JwtSignOptions = {
      secret: this._refreshJWTSecret,
      expiresIn: this._refreshExpiresIn,
    };

    console.log('accessSignOptions', accessSignOptions)
    console.log('refreshSignOptions', refreshSignOptions)

    // Авторизуем токены
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync({ id, email }, accessSignOptions),
      this._jwtService.signAsync({ id, email }, refreshSignOptions),
    ]);

    return { accessToken, refreshToken };
  }
}
