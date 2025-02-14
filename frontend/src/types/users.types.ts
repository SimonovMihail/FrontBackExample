/**
 * Enum ролей пользователя
 */
export enum UserRoleEnum {
  ADMIN = 'admin',
  CLIENT = 'client',
}

/**
 * DTO пользователя
 */
export interface UserDTO {
  id: string;
  email: string;
  fullName: string;
  registeredAt: Date | string;
  roles: UserRoleDTO[];
}

/**
 * DTO роли
 */
export interface UserRoleDTO {
  id: string;
  name: UserRoleEnum;
  addedAt: Date | string;
}

/**
 * DTO для создания пользователя - присылается с клиента
 */
export interface CreateUserRequestDTO {
  email: string;
  password: string;
  roles: UserRoleDTO[];
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