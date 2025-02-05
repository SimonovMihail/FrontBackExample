<template>
  <div class="min-vh-100">
    <header class="p-2 h-10 w-100 position-static top-0 start-0">
      <button v-if="isLogin()" class="btn btn-primary" @click="navigateLogin">Войти</button>
      <button v-else class="btn btn-primary" @click="navigateLogin">{{getUserName()}}</button>

      <!-- ADMIN BUTTONS -->
      <template v-if="isAdmin()">
        <button class="btn btn-danger">Admin</button>
        <button class="btn btn-primary" @click="navigateUsersList">Список пользователей</button>
      </template>

      <button v-show="isClient()" class="btn btn-primary">Client</button>
    </header>

    <slot></slot>

    <footer class="w-100 position-static bottom-0 start-0">Footer</footer>
  </div>
</template>

<script setup lang="ts">
import api from '@/api'
import { UserRoleEnum, type UserDTO } from '@/types/users.types'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref<UserDTO | null>(null)

onMounted(async () => {
  const currentUser = await api.users.getCurrentUser()
  user.value = currentUser
})

const { push } = useRouter()

function navigateLogin() {
  push('/login')
}

function navigateUsersList() {
  push('/users')
}

function isLogin(): boolean {
  return user.value === null;
}

function isAdmin(): boolean {
  const roles = user.value?.roles.map(({ name }) => name)
  return roles?.includes(UserRoleEnum.ADMIN) ?? false
}

function isClient(): boolean {
  const roles = user.value?.roles.map(({ name }) => name)
  return roles?.includes(UserRoleEnum.CLIENT) ?? false
}

function getUserName() {
  return user.value?.roles.map(({ name }) => name).join(",")
}
</script>
