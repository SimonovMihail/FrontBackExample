import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

import { UsersService } from "@Modules/users/users.service";
import {
  CreateUserRequestDTO,
  type JWTUser,
  UserDTO,
  UserRequestDTO,
  UserRoleDTO,
  UserRoleEnum,
  UsersListRequestDTO,
  type UsersListResponseDTO,
  UsersServiceCmd
} from "@Types/users.types";
import { RolesDecorator } from "@Decorators/roles.decorator";
import { JWTUserDecorator } from "@Decorators/jwt-user.decorator";

@Controller('api/users')
export class UsersController {
  public constructor(private readonly _usersService: UsersService) {}

  /**
   * Возвращает список пользователей
   */
  @Get(UsersServiceCmd.GET_USERS)
  public getUsers(
    @Query() query: UsersListRequestDTO,
  ): Promise<UsersListResponseDTO> {
    return this._usersService.getUsers(query);
  }

  /**
   * Возвращает пользователя по jwt токену
   */
  @Get(UsersServiceCmd.GET_USER_CURRENT)
  public getCurrentUser(
    @JWTUserDecorator() user: JWTUser,
  ): Promise<UserDTO> {
    return this._usersService.getCurrentUser(user);
  }

  /**
   * Возвращает пользователя по id
   */
  @Get(UsersServiceCmd.GET_USER)
  @RolesDecorator([UserRoleEnum.ADMIN])
  public getUser(
    @Query() query: UserRequestDTO,
  ): Promise<UserDTO> {
    return this._usersService.getUser(query);
  }

  /**
   * Возвращает список ролей
   */
  @Get(UsersServiceCmd.GET_ROLES)
  @RolesDecorator([UserRoleEnum.ADMIN])
  public getRoles(): Promise<UserRoleDTO[]> {
    return this._usersService.getRoles();
  }

  /**
   * Создает нового пользователя
   */
  @Post(UsersServiceCmd.CREATE_USER)
  @RolesDecorator([UserRoleEnum.ADMIN])
  public createUser(
    @Body() reqDTO: CreateUserRequestDTO,
  ): Promise<RpcException> {
    return this._usersService.createUser(reqDTO);
  }
}