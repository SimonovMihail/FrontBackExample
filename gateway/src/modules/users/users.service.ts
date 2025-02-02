import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";

import { MsNames } from "@Modules/ms/ms.types";
import { firstValueFrom } from "rxjs";
import {
  CreateUserRequestDTO,
  type JWTUser,
  UserDTO,
  UserRequestDTO,
  UserRoleDTO,
  UsersListRequestDTO,
  type UsersListResponseDTO,
  UsersServiceCmd
} from "@Types/users.types";

@Injectable()
export class UsersService {
  public constructor(
    @Inject(MsNames.USERS) private readonly _clientProxy: ClientProxy,
  ) {}

  /**
   * Возвращает список пользователей
   */
  public getUsers(
    query: UsersListRequestDTO,
  ): Promise<UsersListResponseDTO> {
    return firstValueFrom(
      this._clientProxy.send<UsersListResponseDTO, UsersListRequestDTO>(
        UsersServiceCmd.GET_USERS, query
      ),
    );
  }
  
  /**
   * Возвращает пользователя по jwt токену
   */
  public getCurrentUser(
    jwtUser: JWTUser,
  ): Promise<UserDTO> {
    return firstValueFrom(
      this._clientProxy.send<UserDTO, JWTUser>(
        UsersServiceCmd.GET_USER_CURRENT, jwtUser
      ),
    );
  }

  /**
   * Возвращает пользователя по id
   */
  public getUser(
    query: UserRequestDTO,
  ): Promise<UserDTO> {
    return firstValueFrom(
      this._clientProxy.send<UserDTO, UserRequestDTO>(
        UsersServiceCmd.GET_USER, query
      ),
    );
  }

  /**
   * Возвращает список ролей
   */
  public getRoles(): Promise<UserRoleDTO[]> {
    return firstValueFrom(
      this._clientProxy.send<UserRoleDTO[], object>(UsersServiceCmd.GET_ROLES, {}),
    );
  }

  /**
   * Создает нового пользователя
   */
  public createUser(reqDTO: CreateUserRequestDTO): Promise<RpcException> {
    return firstValueFrom(
      this._clientProxy.send<RpcException, CreateUserRequestDTO>(
        UsersServiceCmd.CREATE_USER, reqDTO
      ),
    );
  }
}