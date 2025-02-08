import { IsEmail, IsString } from "class-validator";

import type { JWTUser } from "@Types/users.types";

/**
 * DTO пользователя, которое присылается с клиента для JWT авторизации
 */
export class AuthRequestDTO {
  @IsEmail(undefined, { message: 'Параметр email должен быть почтой' })
    public email: string;

    @IsString({ message: 'ФИО должен быть строкой' })
    public fullName: string;

  @IsString({ message: 'Параметр password должен быть строкой' })
    public password: string;

    @IsString({ message: 'Номер должен быть строкой' })
    public number: string;

    @IsString({ message: 'вуз должен быть строкой' })
    public vuz: string;

    @IsString({ message: 'Направление вуза должен быть строкой' })
    public vuz_direction: string;

    @IsString({ message: 'Код специальности должен быть строкой' })
    public code_speciality: string;

    @IsString({ message: 'Курс должен быть строкой' })
    public course: string;
}

/**
 * DTO JWT токенов (токен доступа и токен обновления)
 */
export interface JWTTokens {
  accessToken: string;
  refreshToken: string;
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
  tokens: Partial<JWTTokens>
  user: JWTUser
}
