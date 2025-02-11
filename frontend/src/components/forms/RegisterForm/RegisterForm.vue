<template>
    <FormLayout>


        <h1 class="main-container-name">Регистрация</h1>

        <Input v-for="input in registerInputs"
               :key="input.key"
               :type="input.type"
               :name="input.name"
               class-name="rounded-end"
               :placeholder="input.placeholder"
               :prepend="input.prepend"
               :disabled="input.disabled">
        </Input>

        <el-radio-group v-model="radio1" size="large">
            <el-radio-button label="Лидер команды" value="Leader" />
            <el-radio-button label="Участник" value="Participant" />
        </el-radio-group>

        <el-button class="button-confirm" type="primary" @click="downloadFile">Скачать файл</el-button>


        <el-upload ref="uploadRef"
                   class="upload-demo"
                   action="http://127.0.0.1:5432/"
                   :auto-upload="false">
            <template #trigger>
                <el-button type="primary">select file</el-button>
            </template>



            <el-button class="ml-3" type="success" @click="submitUpload">
                upload to server
            </el-button>

            <template #tip>
                <div class="el-upload__tip">
                    files with a size less than 200mb
                </div>
            </template>
        </el-upload>

        <el-checkbox v-model="checked" label="Настоящмм подтверждаю, что я ознакомлен и согласен с условиями политики конфиденциальности " />
        <a href="#">Узнать больше</a>

        <div class="button-container">
            <el-button v-if="checked == true" class="button-confirm" type="primary" @click="handleRegister">Зарегистрироваться</el-button>
            <el-button v-if="checked == false" class="button-confirm" type="primary" @click="handleRegister" disabled>Зарегистрироваться</el-button>
            <el-button class="button-move-to-login" type="info" @click="Move_To_Login">Войти в аккаунт</el-button>
        </div>


    </FormLayout>
</template>

<script lang="ts" setup>
    import { useRoute } from 'vue-router'
    import { useForm } from 'vee-validate'

    import { ref } from 'vue'
    import type { UploadInstance } from 'element-plus'

    import Input from '../../Input/Input.vue'
    import registerInputs from './RegisterFormInputs'

    import FormLayout from '@/layouts/FormLayout/FormLayout.vue'
    import api from '@/api'

    const route = useRoute()

    const radio1 = ref('Leader')

    const checked = ref(false)

    const uploadRef = ref<UploadInstance>()

    const downloadFile = () => {
        const fileUrl = '../doc/doc.txt';
        const Nametxt = 'file.txt';

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = Nametxt;
        link.click();
    }

    const submitUpload = () => {
        uploadRef.value!.submit()
    }

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
        api.auth.register({ email: values.email, fullName: values.fullName, password: values.password, number: values.number, vuz: values.vuz, vuz_direction: values.vuz_direction, code_speciality: values.code_speciality, course: values.course,})
    })



</script>

<style scoped>

    form {
        margin: 0 auto;
    }

    .main-container-name {
        padding-bottom: 20px;
    }

    
    h1{
        color: black;
    }

    .button-confirm {
        width: 50%;
    }

    .button-move-to-login {
        width: 50%;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
    }
</style>


