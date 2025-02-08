<template>
    <FormLayout>
        <p class-name="fs-3 text-primary text-center">Регистрация</p>

        <Input v-for="input in registerInputs"
               :key="input.key"
               :type="input.type"
               :name="input.name"
               class-name="rounded-end"
               :placeholder="input.placeholder"
               :prepend="input.prepend"
               :disabled="input.disabled">
        <template #prepend>
            <i :class="input.prependIcon"></i>
        </template>
        </Input>

        <button type="submit" class="btn btn-primary w-100 mt-3" @click="handleRegister">
            Зарегистрироваться
        </button>
    </FormLayout>
</template>

<script lang="ts" setup>
    import { useRoute } from 'vue-router'
    import { useForm } from 'vee-validate'

    import Input from '../../Input/Input.vue'
    import registerInputs from './RegisterFormInputs'

    import FormLayout from '@/layouts/FormLayout/FormLayout.vue'
    import api from '@/api'

    const route = useRoute()

    const { handleSubmit } = useForm({
        validationSchema: {
            email: (value: string) => !!value || 'Неверно введена почта',
            fullName: (value: string) => !!value || 'Неверно введен Фио',
            password: (value: string) => !!value || 'Неверно введен пароль',
            number: (value: string) => !!value || 'Неверно введен номер',
            vuz: (value: string) => !!value || 'Неверно введен вуз',
            vuz_direction: (value: string) => !!value || 'Неверно введено направление вуза ',
            code_speciality: (value: string) => !!value || 'Неверно введен код специальности',
            course: (value: string) => !!value || 'Неверно введен курс',
        },
    })

    const handleRegister = handleSubmit(async (values) => {
        api.auth.register({ email: values.email, fullName: values.fullName, password: values.password, number: values.number, vuz: values.vuz, vuz_direction: values.vuz_direction, code_speciality: values.code_speciality, course: values.course, })
    })
</script>



