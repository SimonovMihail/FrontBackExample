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
    key: 'password',
    type: 'password',
    name: 'password',
    placeholder: 'Введите пароль',
    prependIcon: 'bi bi-key',
  },
]

export default registerInputs
