import type { UserRoleEnum } from "./users.types"

/**
 * Расширяем интерфейс RouteMeta для добавления метаданных
 */
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: UserRoleEnum[]
  }
}
