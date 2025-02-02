import type { CreateUserRequestDTO, UserDTO, UserRoleDTO, UsersListResponseDTO } from "@/types/users.types"
import type { API } from "."

/**
 * API класс для управления пользователями
*/
export class UsersAPI {
	public readonly USERS_LIST_PATH = 'users/get-users'

	public readonly CURRENT_USER_PATH = 'users/get-user'

	public readonly USER_PATH = 'users/get-user-by-id'

	public readonly ROLES_LIST_PATH = 'users/get-roles'

	public readonly CREATE_USER_PATH = 'users/create-user'

	public constructor(private readonly _api: API) {}

  /**
   * Список пользователей
   */
  async useUsersList(): Promise<UserDTO[]> {
    const result = await this._api.client
      .get<UserDTO[]>(this.USERS_LIST_PATH)
      .then(({ data }) => data)

    return result
  }

  /**
   * Список доступных ролей
   */
  async getUserRoles(): Promise<UserRoleDTO[]> {
    const result = await this._api.client
      .get<UserRoleDTO[]>(this.ROLES_LIST_PATH)
      .then(({ data }) => data)

    return result
  }

  /**
   * Данные текущего пользователя
   */
  async getCurrentUser(): Promise<UserDTO> {
    const result = await this._api.client
      .get<UserDTO>(this.CURRENT_USER_PATH)
      .then(({ data }) => data)

    return result
  }

  /**
   * Получает пользователя по id
   */
  async getUser(id: string): Promise<UserDTO> {
    const result = await this._api.client
      .get<UserDTO>(this.USER_PATH, {
        params: { id }
      })
      .then(({ data }) => data)

    return result
  }

  /**
   * Создает нового пользователя
   */
  async createUser(req: CreateUserRequestDTO): Promise<void> {
    const result = await this._api.client
      .post(this.CREATE_USER_PATH, req)
      .then(({ data }) => data)

    return result
  }
}