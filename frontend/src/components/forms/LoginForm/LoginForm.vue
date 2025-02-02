<template>
  <FormLayout>
    <span class-name="text-primary text-center">Авторизация</span>

    <Input
      v-for="input in loginInputs"
      :key="input.key"
      :type="input.type"
      :name="input.name"
      class-name="rounded-end"
      :placeholder="input.placeholder"
      :prepend="input.prepend"
    >
      <template #prepend>
        <i :class="input.prependIcon"></i>
      </template>
    </Input>

    <button type="submit" class="btn btn-primary" @click="handleLogin">Войти</button>
  </FormLayout>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'

import Input from '../../Input/Input.vue'
import loginInputs from './LoginFormInputs'

import FormLayout from '@/layouts/FormLayout/FormLayout.vue'
import api from '@/api'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: {
    email: (value: string) => !!value || 'Неверно введена почта',
    password: (value: string) => !!value || 'Неверно введен пароль',
  },
})

const handleLogin = handleSubmit(async (values) => {
  await api.auth
    .login({ email: values.email, password: values.password })
    .then(() => router.push('/'))
})
</script>
