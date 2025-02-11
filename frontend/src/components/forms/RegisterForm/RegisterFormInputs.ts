import type { RegisterInputType } from './RegisterForm.types'

const registerInputs: RegisterInputType[] = [
  {
   key: 'email',
   type: 'email',
   name: 'email',
   placeholder: 'Введите почту',
   prepend: 'Почта',
  },
  {
      key: 'fullName',
      type: 'fullName',
      name: 'fullName',
      placeholder: 'Введите Фио',
      prepend: 'ФИО',
  },
  {
    key: 'password',
    type: 'password',
    name: 'password',
      placeholder: 'Введите пароль',
      prepend: 'Пароль',
    },
    {
        key: 'number',   
        type: 'number',
        name: 'number',
        placeholder: 'Введите номер',
        prepend: 'Номер',
    },
    {
        key: 'vuz',
        type: 'vuz',
        name: 'vuz',
        placeholder: 'Введите вуз',
        prepend: 'Вуз',
    },
    {
        key: 'vuz_direction',
        type: 'vuz_direction',
        name: 'vuz_direction',
        placeholder: 'Введите направление вуза',
        prepend: 'Направление вуза',
    },
    {
        key: 'code_speciality',
        type: 'code_speciality',
        name: 'code_speciality',
        placeholder: 'Введите код специальности',
        prepend: 'Код специальности',
    },
    {
        key: 'course',
        type: 'course',
        name: 'course',
        placeholder: 'Введите курс',
        prepend: 'Курс',
    },
]

export default registerInputs
