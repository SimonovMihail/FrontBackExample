import type { RegisterInputType } from './RegisterForm.types'

const registerInputs: RegisterInputType[] = [
  {
   key: 'email',
   type: 'email',
   name: 'email',
   placeholder: 'Введите почту',
   prepend: '@',
  },
  {
      key: 'fullName',
      type: 'fullName',
      name: 'fullName',
   placeholder: 'Введите Фио',
  },
  {
    key: 'password',
    type: 'password',
    name: 'password',
    placeholder: 'Введите пароль',
    prependIcon: 'bi bi-key',
    },
    {
        key: 'number',   
        type: 'number',
        name: 'number',
        placeholder: 'Введите номер',
    },
    {
        key: 'vuz',
        type: 'vuz',
        name: 'vuz',
        placeholder: 'Введите вуз',
    },
    {
        key: 'vuz_direction',
        type: 'vuz_direction',
        name: 'vuz_direction',
        placeholder: 'Введите направление вуза',
    },
    {
        key: 'code_speciality',
        type: 'code_speciality',
        name: 'code_speciality',
        placeholder: 'Введите код специальности',
    },
    {
        key: 'course',
        type: 'course',
        name: 'course',
        placeholder: 'Введите курс',
    },
]

export default registerInputs
