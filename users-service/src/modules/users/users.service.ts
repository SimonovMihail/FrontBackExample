import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

import { User } from '@Entities/user.entity';
import { Role } from '@Entities/role.entity';
import { User2Roles } from '@Entities/user-2-roles.entity';
import {
  CreateUserRequestDTO,
  type JWTUser,
  UserDTO,
  UserRequestDTO,
  UserRoleDTO,
  UserRoleEnum,
} from "@DTOs/users.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly _usersRepository: Repository<User>,

    @InjectRepository(Role) private readonly _rolesRepository: Repository<Role>,

    @InjectRepository(User2Roles)
    private readonly _user2rolesRepository: Repository<User2Roles>,
  ) {}

  /**
   * Возвращает список пользователей
   */
  public async getUsers(): Promise<UserDTO[]> {
    // Используем пагинацию на уровне БД
    const user = await this._usersRepository.find({
      relations: ['user2roles.role']
    });

    const items = user.map(this._userDTOMapper);
    return items;
  }

  /**
   * Возвращает пользователя из бд по его уникальному email
   */
  public getUserByEmail(email: string): Promise<User | null> {
    return this._usersRepository.findOne({ where: { email } });
  }

  /**
   * Возвращает пользователя из бд по его id
   */
  public getUserById(id: string): Promise<User | null> {
    return this._usersRepository.findOne({ where: { id }, relations: { user2roles: {role: true} } });
  }

  /**
   * Возвращает пользователя по jwt токену
   */
  public async getCurrentUser(reqDTO: JWTUser): Promise<UserDTO> {
    const { id } = reqDTO;

    const user = await this.getUserById(id);

    if (!user) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Неверные входные данные',
      });
    }

    return this._userDTOMapper(user);
  }

  /**
   * Возвращает пользователя по id
   */
  public async getUser(reqDTO: UserRequestDTO): Promise<UserDTO> {
    const { id } = reqDTO;

    const user = await this.getUserById(id);

    if (!user) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Неверные входные данные',
      });
    }

    return this._userDTOMapper(user);
  }

  /**
   * Возвращает список ролей
   */
  public getRoles(): Promise<UserRoleDTO[]> {
    return this._rolesRepository.find();
  }

  /**
   * Возвращает роль по названию
   */
  public getRoleByName(name: UserRoleEnum): Promise<Role | null> {
    return this._rolesRepository.findOne({ where: { name } });
  }

  /**
   * Создает пользователя в бд
   */
  public async createUser(reqDTO: CreateUserRequestDTO): Promise<UserDTO> {
    const { email, password, roles } = reqDTO;

    // Проверяем, что присланные роли существуют
    const rolesIds = roles.map((role) => role.id);
    const existedRoles = await this._rolesRepository.find({
      where: { id: In(rolesIds) },
    });

    // Если роль не была найдена
    if (existedRoles.length !== rolesIds.length) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Неверные входные параметры'
      });
    }

    // Сохраняем пользователя и связываем его с ролями
    const user = await this._usersRepository.save({
      email,
      password,
    })
    const user2roles = roles.map((role) =>
      this._user2rolesRepository.create({ user, role })
    );
    await this._user2rolesRepository.save(user2roles);

    return this._userDTOMapper(user)
  }

  /**
   * Преобразует сущность пользователя в DTO
   */
  private _userDTOMapper(user: User): UserDTO {
    // Убираем пароль из ответа
    const { user2roles, password, ...rest } = user
    const roles = user.user2roles?.map((user2role) => user2role.role);

    return { ...rest, roles };
  }
}
