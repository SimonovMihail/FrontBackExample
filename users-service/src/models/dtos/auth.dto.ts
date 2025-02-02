import type { JWTUser } from "@DTOs/users.dto";

/**
 * DTO пользователя, которое присылается с клиента для JWT авторизации
 */
export class AuthRequestDTO {
  public email: string;

  public password: string;
}

/**
 * DTO JWT токенов (токен доступа и токен обновления)
 */
export interface JWTTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * DTO для формирования использованного токена в бд
 */
export class UsedTokenDTO {
  userId: string;
  token: string;
  type: JWTTokenType;
}

/**
 * Enum JWT токена
 */
export enum JWTTokenType {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

/**
 * Команды для взаимодействия с микросервисом авторизации
 */
export enum AutoServiceCmd {
  LOGIN = 'login',
  REGISTER = 'register',
  REFRESH = 'refresh',
  LOGOUT = 'logout',
  CHECK_ACCESS = 'check-access',
}

/**
 * DTO с для выхода из аккаунта
 */
export interface LogoutRequestDTO {
  tokens: JWTTokens
  user: JWTUser
}
