<template>
  <BaseLayout>
    <h1>{{ user?.email }}</h1>
  </BaseLayout>
</template>

<script setup lang="ts">
import api from '@/api'
import BaseLayout from '@/layouts/BaseLayout/BaseLayout.vue'
import type { UserDTO } from '@/types/users.types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const { params } = useRoute()

const user = ref<UserDTO | null>(null)

onMounted(async () => {
  const id = params.id

  if (typeof id === 'string') {
    const result = await api.users.getUser(id)
    user.value = result
  }
})
</script>
