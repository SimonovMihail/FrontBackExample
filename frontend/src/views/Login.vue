<template>
  <PrimaryLayout>
    <div class="wrapper">
      <div class="wrapper__main-container">
        <h1 class="main-container-name">Вход</h1>
        <el-form
            :model="formModel"
            :rules="rules"
            ref="formRef"
            class="registration-form"
            label-width="70px"
            label-position="left"
            @submit.prevent="submitLogin"
        >
          <el-form-item label="Email:" prop="email">
            <el-input class="input-email" v-model="formModel.email"></el-input>
          </el-form-item>
          <el-form-item label="Пароль:" prop="password">
            <el-input type="password" class="input-password" v-model="formModel.password"></el-input>
          </el-form-item>
          <div class="button-container">
            <el-button class="button-confirm" type="primary" @click="submitLogin">Войти</el-button>
            <el-button class="button-move-to-register" type="info" @click="Move_To_Register">Зарегистрироваться</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </PrimaryLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElForm, ElInput, ElButton, FormInstance, FormRules } from 'element-plus';
import PrimaryLayout from '../layouts/Header-Footer/PrimaryLayout.vue';
import { useRouter } from 'vue-router';
import api from "@/api";
import { UserRoleEnum } from "@/types/users.types.ts";

const router = useRouter();

const formModel = ref({
  email: '',
  password: '',
});

const rules: FormRules = {
  email: [
    { required: true, message: 'Пожалуйста, введите почту', trigger: 'blur' },
    { type: 'email', message: 'Почта введена некорректно', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' },
  ],
};

const formRef = ref<FormInstance>();

const submitLogin = async () => {
  const valid = await formRef.value?.validate();

  if (valid) {
    try {
      const loginRequest = {
        email: formModel.value.email,
        password: formModel.value.password,
      };

      await api.auth.login(loginRequest);
      const currentUser = await api.users.getCurrentUser();

      if (currentUser.roles.map(({ name }) => name).includes(UserRoleEnum.ADMIN)) {
        Move_To_Admin();
      }
      else if (currentUser.roles.map(({ name }) => name).includes(UserRoleEnum.CLIENT)) {
        Move_To_Main();
      }
      else if (currentUser.roles.map(({ name }) => name).includes(UserRoleEnum.TEAM_MEMBER)) {
        Move_To_Main();
      }
      else if (currentUser.roles.map(({ name }) => name).includes(UserRoleEnum.JUDGE)) {
        Move_To_Judge();
      }
    } catch (error) {
      console.error('Ошибка при попытке входа в систему', error);
      alert('Ошибка при попытке входа в систему');
    }
  } else {
    console.error('Form error');
    alert('Заполните недостающие поля!');
  }
};

function Move_To_Main() {
  router.push({
    path: `/`
  });
}

function Move_To_Admin() {
  router.push({
    path: '/admin'
  });
}

function Move_To_Judge() {
  router.push({
    path: '/judge'
  });
}

const scroll = ({ scrollTop }) => {
  value.value = scrollTop;
};

const value = ref(0);

function Move_To_Register() {
  router.push({
    path: '/registration'
  });
}
</script>


<style scoped>
.wrapper-for-correct-viewport { /* Чтобы пофиксить ту хуйню с отрыванием футера */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  gap: 10px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper .wrapper__main-container {
  color: black;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 1px 2px 2px 3px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
  border-radius: 2%;
}

.main-container-name {
  padding-bottom: 20px;
}

.button-confirm {
  width: 120px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}
</style>
