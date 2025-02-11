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
 * Команды для взаимодействия с модулем управления пользователями
 */
export enum UsersServiceCmd {
  GET_USERS = 'get-users',
  GET_CURRENT_USER = 'get-user',
  GET_USER = 'get-user-by-id',
  GET_ROLES = 'get-roles',
  CREATE_USER = 'create-user',
}

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
  public entry_sent: boolean;
  public user_valid: boolean;
  public team_member_1_id: string;
  public team_member_2_id: string;
  public team_member_3_id: string;
  public team_member_4_id: string;
}

/**
 * DTO роли
 */
export class UserRoleDTO {
  public id: string;

  public name: UserRoleEnum;

  public addedAt: Date | string;
}

/**
 * DTO для создания пользователя - присылается в микросервис
 */
export class CreateUserRequestDTO {
  public email: string;

  public password: string;

  public roles: UserRoleDTO[];
}

/**
 * DTO с постраничным выводом пользователей - присылается в микросервис
 */
export class UsersListRequestDTO {
  public page?: number;

  public size?: number;
}

/**
 * Payload пользователя в JWT токене
 */
export interface JWTUser {
  id: string;
  email: string
}

export interface UserRequestDTO {
  id: string 
}
