import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router'

import { UserRoleEnum } from '@/types/users.types'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UsersView from '@/views/UsersView.vue'
import UsersCreateView from '@/views/UsersCreateView.vue'
import GuestView from '@/views/GuestView.vue'
import UserEditView from '@/views/UserEditView.vue'

/**
 * Доступные страницы приложения
 */
const routes: RouteRecordRaw[] = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/users',
    component: UsersView,
    meta: { requiresAuth: true, roles: [UserRoleEnum.ADMIN] }
  },
  {
    path: '/users/:id',
    component: UserEditView,
    meta: { requiresAuth: true, roles: [UserRoleEnum.ADMIN] }
  },
  {
    path: '/users/create',
    component: UsersCreateView,
    meta: {
      requiresAuth: true,
      roles: [UserRoleEnum.ADMIN]
    }
  },
  {
    path: '/',
    component: GuestView,
  }
]

/**
 * Роутер приложения
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * Миддлвар для проверки авторизации и ролей пользователя
 */
// router.beforeEach(async (to, from, next) => {
  // // Проверяем, требует ли маршрут авторизации
  // if (to.meta.requiresAuth) {
  //   const currentUser = await api.users
  //     .getCurrentUser()
  //     .catch(() => null)

  //   if (!currentUser) {
  //     return next('/login')
  //   }

  //   // Проверяем, есть ли у пользователя нужная роль
  //   const userRole = currentUser.roles.map(({ name }) => name)
  //   const isMatchRoles = to.meta.roles?.some((role) => userRole.includes(role))
  //   if (!to.meta.roles?.length || isMatchRoles) {
  //     return next()
  //   } else {
  //     next(from.fullPath)
  //   }
  // } else {
  //   // Если авторизация не требуется
  //   next()
  // }
// })

export default router
