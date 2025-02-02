/**
 * DTO пользователя, которое присылается с клиента для JWT авторизации
 */
export interface AuthRequestDTO {
  email: string;
  password: string;
}