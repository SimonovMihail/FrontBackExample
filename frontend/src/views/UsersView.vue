<template>
  <BaseLayout>
    <h1>Users List</h1>

    <ul class="list-group">
      <li v-for="user in users" class="list-group-item">
        <div class="p-2">{{ user.email }}</div>
        <div class="p-2">{{ user.fullName }}</div>

        <button class="btn btn-primary" @click="navigate2user(user.id)">Редактировать</button>
      </li>
    </ul>
  </BaseLayout>
</template>

<script setup lang="ts">
import api from '@/api'
import BaseLayout from '@/layouts/BaseLayout/BaseLayout.vue'
import type { UserDTO } from '@/types/users.types'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const users = ref<UserDTO[] | null>(null)

onMounted(async () => {
  const result = await api.users.useUsersList()
  users.value = result
})

function navigate2user(id: string) {
  push(`/users/${id}`)
}
</script>
