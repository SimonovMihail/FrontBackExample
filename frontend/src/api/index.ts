import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import useSWRV, { type IConfig as SWRVConfiguration } from "swrv";

import { UsersAPI } from "./users.api";
import { AuthAPI } from "./auth.api";

/**
 * API класс для запросов с сервера
*/
export class API {
  private readonly _client: AxiosInstance;

  // Конфигурация хука useSWRV для клиент рендеринга
  public SWRVConfig: SWRVConfiguration = {
    revalidateOnFocus: false,
  };

  // Используется в блокировании остальных запросов на /refresh пока обновляется токен
  private isRefreshingToken = false

  public readonly users: UsersAPI 
  public readonly auth: AuthAPI

  public constructor() {
    const baseURL = import.meta.env.VITE_API_URL

    // Создаем клиента axios
    this._client = axios.create({
      baseURL,
      withCredentials: true,
    })

    this._client.interceptors.request.use((config) => {
        return config
    }, (error) => Promise.reject(error))

    // Перехватчик ответов от сервера
    this._client.interceptors.response.use(
      this._onSuccessResponse,
      this._onErrorResponse
    )

    this.users = new UsersAPI(this)
    this.auth = new AuthAPI(this)
  }

  /**
   * Клиент axios
   */
  public get client(): AxiosInstance {
    return this._client
  }

  /**
   * Запрашивает данные с сервера
   */
  private async _fetcher(url: string): Promise<unknown> {
    return this.client.get(url).then((res) => res.data)
  }

  /**
   * Возвращает url строку из HTTP запроса
   */
  private _getHTTPUrlFromRequest(request: XMLHttpRequest): string {
    let path = new URL(request.responseURL).pathname.substring(1)

    // Убираем api/
    if (path.indexOf('api/') === 0) {
      path = path.substring(4)
    }

    return path
  }

  /**
   * Перехватчик 200 ответов от сервера
   */
  private _onSuccessResponse = (
    response: AxiosResponse<unknown>,
  ): AxiosResponse<unknown> => {
    const request: XMLHttpRequest = response.request

    // Путь куда запрашивали
    const path = getHTTPUrlFromRequest(request)

    // Если запрос был на обновление токена, то убираем блокировку остальных запросов на /refresh
    if (path === this.auth.REFRESH_TOKEN_PATH) {
      this.isRefreshingToken = false
    }

    return response
  }

  /**
   * Перехватчик 500 ответов от сервера
   */
  private async _onErrorResponse(error: any): Promise<unknown> {
    const originalRequest = error.config
    const request: XMLHttpRequest = error.request

    // Путь куда запрашивали
    const path = getHTTPUrlFromRequest(request)

    // Если запрос был на обновление токена, то убираем блокировку остальных запросов на /refresh
    if (path === this.auth.REFRESH_TOKEN_PATH) {
      this.isRefreshingToken = false
    }

    // Нет авторизации, ещё не пробовали обновить, не форма авторизации и не выход
    if (
      error.response.status === 401 &&
      [
        this.auth.LOGIN_PATH,
        this.auth.REGISTER_PATH,
        this.auth.LOGOUT_PATH,
      ].indexOf(path) === -1
    ) {

      // Токен обновления не действителен
      if (path === this.auth.REFRESH_TOKEN_PATH) {
        // Перекидываем на страницу об истечении текущей сессии
        return
      }


      // Чтобы не пробовать обновить более одного раза подряд
      originalRequest._retry = true

      // Обновляем токен
      if (!this.isRefreshingToken) {
        this.isRefreshingToken = true
        await this.auth.refresh()
      }

      return this._client(originalRequest)
    }

    console.error(error)
    return Promise.reject(error)
  }
}

function getHTTPUrlFromRequest(request: XMLHttpRequest): string {
  let path = new URL(request.responseURL).pathname.substring(1)

  // Убираем api/
  if (path.indexOf('api/') === 0) {
    path = path.substring(4)
  }

  return path
}

const api = new API()

export default api
