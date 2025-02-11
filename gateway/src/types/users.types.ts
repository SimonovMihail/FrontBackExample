import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested
} from "class-validator";
import { Type } from 'class-transformer';

/**
 * DTO пользователя
 */
export class UserDTO {
  public id: string;
  public email: string;
  public registeredAt: Date | string;
  public roles: UserRoleDTO[];
  public work_grade: string;
  public number: string;
  public vuz: string;
  public vuz_direction: string;
  public code_speciality: string;
  public course: string;
  public education_degree: string;
  public team_name: string;
  public team_motto: string;
}

/**
 * Payload пользователя в JWT токене
 */
export interface JWTUser {
  id: string;
  email: string
}

/**
 * Enum ролей пользователя
 */
export enum UserRoleEnum {
  ADMIN = 'admin',
  CLIENT = 'client',
  JUDGE = 'judge',
  TEAM_MEMBER = 'team_member',
}

/**
 * DTO роли
 */
export class UserRoleDTO {
  @IsUUID(4, { message: 'Недопустимое значение параметра id' })
  public id: string;

  @IsEnum(UserRoleEnum, { message: 'Недопустимое значение параметра name' })
  public name: UserRoleEnum;

  public addedAt: Date | string;
}

/**
 * Команды для взаимодействия с микросервисом управления пользователями
 */
export enum UsersServiceCmd {
  GET_USERS = 'get-users',
  GET_USER_CURRENT = 'get-user',
  GET_USER = 'get-user-by-id',
  GET_ROLES = 'get-roles',
  CREATE_USER = 'create-user',
}

/**
 * DTO для создания пользователя - присылается с клиента
 */
export class CreateUserRequestDTO {
  @IsEmail(undefined, { message: 'Параметр email должен быть почтой' })
  public email: string;

  @IsString({ message: 'Параметр password должен быть строкой' })
  public password: string;

  @IsArray({ message: 'Параметр roles должен быть массивом' })
  @ArrayNotEmpty({ message: 'Параметр roles не должен быть пустым' })
  @ValidateNested({ each: true, message: 'Недопустимое значение параметра roles' })
  @Type(() => UserRoleDTO)
  roles: UserRoleDTO[];
}

/**
 * DTO с постраничным выводом пользователей - присылается с клиента
 */
export class UsersListRequestDTO {
  @IsOptional()
  @IsNumberString(undefined, { message: 'Параметр page должен быть числом' })
  public page?: number;

  @IsOptional()
  @IsNumberString(undefined, { message: 'Параметр size должен быть числом' })
  public size?: number;
}

/**
 * DTO с постраничным выводом пользователей - возвращается с сервера
 */
export interface UsersListResponseDTO {
  // Элементы для текущей страницы
  items: UserDTO[];

  // Текущая страница с 0
  page: number;

  // Количество элементов на станице
  size: number;

  // Общее количество страниц
  count: number;

  // Общее количество элементов
  total: number;
}

export class UserRequestDTO {
  @IsUUID(4, { message: 'Недопустимое значение параметра id' })
  id: string;
}
