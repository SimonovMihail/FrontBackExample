<template>
  <el-scrollbar ref="scrollbarRef" height="100vh" always @scroll="scroll">
    <div class="wrapper-for-correct-viewport">
      <Header/>
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
              @submit.prevent="submitForm"
          >
            <el-form-item label="Email:" prop="email">
              <el-input class="input-email" v-model="formModel.email"></el-input>
            </el-form-item>
            <el-form-item label="Пароль:" prop="password">
              <el-input type="password" class="input-password" v-model="formModel.password"></el-input>
            </el-form-item>
            <div class="button-container">
              <el-button class="button-confirm" type="primary" @click="submitForm">Войти</el-button>
              <el-button class="button-move-to-register" type="info" @click="Move_To_Register">Зарегистрироваться</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <Footer/>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElForm, ElInput, ElButton, ElScrollbar, FormInstance, FormRules } from 'element-plus';
import Header from '../layouts/Header/Header.vue';
import Footer from '../layouts/Footer/Footer.vue';
import { useRouter } from 'vue-router';

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

const submitForm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('Form sent', formModel.value);
      console.log(formModel.value.email);
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
