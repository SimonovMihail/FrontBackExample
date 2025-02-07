<template>
  <PrimaryLayout>
    <div class="wrapper">
      <div class="wrapper__main-container">
        <h1 class="main-container-name">Регистрация</h1>
        <el-form
            :model="registrationFormModel"
            :rules="rules"
            ref="registrationFormRef"
            class="registration-form"
            label-width="160px"
            label-position="left"
            @submit.prevent="submitRegistrationForm"
        >
          <el-form-item label="Email:" prop="email">
            <el-input class="input-email" v-model="registrationFormModel.email"></el-input>
          </el-form-item>
          <el-form-item label="Пароль:" prop="password">
            <el-input type="password" class="input-password" v-model="registrationFormModel.password"></el-input>
          </el-form-item>
          <el-form-item label="Подтвердите пароль:" prop="confirm_password">
            <el-input type="password" class="input-confirm-password" v-model="registrationFormModel.confirm_password"></el-input>
          </el-form-item>
          <div class="button-container">
            <el-button class="button-confirm" type="primary" @click="submitRegistrationForm">Зарегистрироваться</el-button>
            <el-button class="button-move-to-login" type="info" @click="Move_To_Login">Войти в аккаунт</el-button>
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

const router = useRouter();

const registrationFormModel = ref({
  email: '',
  password: '',
  confirm_password: '',
});

// Важное замечание: так как переменная registrationFormModel ссылается на объект, рождённый через ref, то для
// обращения к нашим данным нужно обращаться через свойство value (как на функции снизу).
// Я мог бы создать объект и через reactive, и тогда не пришлось бы обращаться через value, но просто мы пользуемся простыми значениями,
// а reactive всё таки предназначен для более сложных структур.
// rule оставь, без него всё ляжет
const checkPasswordCorrection = function(rule: any, value: any, callback: any) {
  if (value !== registrationFormModel.value.password) {
    callback(new Error("Пароли не совпадают"))
  }
}

const registrationFormRef = ref<FormInstance>();

const rules: FormRules = {
  email: [
    { required: true, message: 'Пожалуйста, введите почту', trigger: 'blur' },
    { type: 'email', message: 'Почта введена некорректно', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' },
  ],
  confirm_password: [
    { required: true, message: 'Пожалуйста, подтвердите пароль', trigger: 'blur' },
    { validator: checkPasswordCorrection, trigger: 'blur' }
  ],
};

const submitRegistrationForm = () => {
  registrationFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('Form sent', registrationFormModel.value);
      console.log(
          registrationFormModel.value.email,
          registrationFormModel.value.password,
      );
    } else {
      console.error('Form error');
      alert('Заполните недостающие поля!');
    }
  });
};

const scroll = ({ scrollTop }) => {
  value.value = scrollTop;
};

const value = ref(0);

function Move_To_Login() {
  router.push({
    path: '/login'
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
  width: 450px;
  text-align: center;
  border-radius: 2%;
}

.main-container-name {
  padding-bottom: 20px;
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
