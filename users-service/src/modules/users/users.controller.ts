import { Controller } from "@nestjs/common";

import { UsersService } from "@Modules/users/users.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import {
  CreateUserRequestDTO,
  type JWTUser,
  UserDTO,
  UserRequestDTO,
  UserRoleDTO,
  UsersServiceCmd
} from "@DTOs/users.dto";

@Controller()
export class UsersController {
  public constructor(private readonly _usersService: UsersService) {}

  /**
   * Возвращает список пользователей
   */
  @MessagePattern(UsersServiceCmd.GET_USERS)
  public getUsers(): Promise<UserDTO[]> {
    return this._usersService.getUsers();
  }

  /**
   * Возвращает пользователя по jwt токену
   */
  @MessagePattern(UsersServiceCmd.GET_CURRENT_USER)
  public getCurrentUser(
    @Payload() reqDTO: JWTUser,
  ): Promise<UserDTO> {
    return this._usersService.getCurrentUser(reqDTO);
  }

  /**
   * Возвращает пользователя по id
   */
  @MessagePattern(UsersServiceCmd.GET_USER)
  public getUser(
    @Payload() reqDTO: UserRequestDTO,
  ): Promise<UserDTO> {
    return this._usersService.getUser(reqDTO);
  }

  /**
   * Возвращает список ролей
   */
  @MessagePattern(UsersServiceCmd.GET_ROLES)
  public getRoles(): Promise<UserRoleDTO[]> {
    return this._usersService.getRoles();
  }

  /**
   * Создает нового пользователя
   */
  @MessagePattern(UsersServiceCmd.CREATE_USER)
  public createUser(
    @Payload() reqDTO: CreateUserRequestDTO,
  ): Promise<UserDTO> {
    return this._usersService.createUser(reqDTO);
  }
}