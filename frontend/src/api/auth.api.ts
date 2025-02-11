import type { API } from "."
import type { AuthRequestDTO } from "@/types/auth.types"

/**
 * API класс для авторизации
*/
export class AuthAPI {
	public readonly LOGIN_PATH = 'auth/login'

  public readonly REGISTER_PATH = 'auth/register'

  public readonly REFRESH_TOKEN_PATH = 'auth/refresh'

  public readonly LOGOUT_PATH = 'auth/logout'

  public constructor(private readonly _api: API) {}

  /**
   * Вход в аккаунт
   */
  public async login(loginRequest: AuthRequestDTO): Promise<void> {
    await this._api.client.post(this.LOGIN_PATH, loginRequest)
  }

  /**
   * Регистрация
   */
  public async register(registerRequest: AuthRequestDTO): Promise<void> {
      await this._api.client.post(this.REGISTER_PATH, registerRequest)

  }

  /**
   * Выход
   */
  public async logout(): Promise<void> {
    await this._api.client.post(this.LOGOUT_PATH)
  }

  /**
   * Обновление токенов
   */
  public async refresh(): Promise<void> {
    await this._api.client.post(this.REFRESH_TOKEN_PATH)
  }
}