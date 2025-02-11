/**
 * DTO пользователя, которое присылается с клиента для JWT авторизации
 */
export interface AuthRequestDTO {
  email: string;
  fullName: string;
    password: string;
    number: string;
    vuz: string;
    vuz_direction: string;
    code_speciality: string;
    course: string;
}