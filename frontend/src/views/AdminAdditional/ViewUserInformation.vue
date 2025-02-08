<template>
  <PrimaryLayout>
    <div class="wrapper">
      <div class="wrapper__main-container">
        <h1 class="main-container-name">Просмотр информации о пользователе</h1>
        <el-form
            :model="userInformationFormModel"
            :rules="rules_users"
            ref="userInformationFormRef"
            class="userInformation-form"
            label-width="110px"
            @submit.prevent="saveUserInformationChanges"
            label-position="left"
        >
          <div class="userInformation-form__container team-lead-info-container">
            <h3 class="userInformation-form-info-container-name">Основные данные</h3>
            <el-form-item label="ФИО:" label-width="90px" prop="user_info_fio">
              <el-input class="input-user_info_fio" v-model="userInformationFormModel.user_info_fio" clearable></el-input>
            </el-form-item>
            <el-form-item label="Email:" label-width="90px" prop="user_info_email">
              <el-input class="input-user_info_email" v-model="userInformationFormModel.user_info_email" clearable></el-input>
            </el-form-item>
            <el-form-item label="Телефон:" label-width="90px" prop="user_info_number">
              <el-input class="input-user_info_number" v-model="userInformationFormModel.user_info_number" clearable>
                <template #prepend>+7</template>
              </el-input>
            </el-form-item>
            <el-form-item label="ВУЗ:" label-width="90px" prop="user_info_vuz">
              <el-input class="input-user_info_vuz" v-model="userInformationFormModel.user_info_vuz" clearable></el-input>
            </el-form-item>
            <el-form-item class="upload-files-button user_info_pfp" label="Аватарка:" label-width="90px" label-position="left">
              <el-button type="primary">Скачать файл</el-button>
            </el-form-item>
          </div>

          <div class="userInformation-form__container team-lead-vuz-info-container">
            <h3 class="userInformation-form-info-container-name">Направление/специальность и курс</h3>
            <el-form-item label="Направление:" prop="user_info_vuz_direction"> <!-- В контексте ВУЗа "направление" переводится как "program", но похуй -->
              <el-input class="input-user_info_vuz_direction" v-model="userInformationFormModel.user_info_vuz_direction" clearable></el-input> <!-- "direction" проще воспринимается -->
            </el-form-item>
            <el-form-item label="Код:" prop="user_info_vuz_code">
              <el-input class="input-code" v-model="userInformationFormModel.user_info_vuz_code" clearable></el-input>
            </el-form-item>
            <el-form-item class="user_info_value_courses" prop="user_info_value_courses">
              <el-select
                  v-model="userInformationFormModel.user_info_value_courses"
                  placeholder="Выбор курса"
                  class="user_info_value_courses__select"
                  size="large"
                  style="width: 240px"
              >
                <el-option
                    v-for="user_info_course in user_info_courses"
                    :key="user_info_course.user_info_value_courses"
                    :label="user_info_course.user_info_value_courses"
                    :value="user_info_course.user_info_value_courses"
                />
              </el-select>
            </el-form-item>
            <el-form-item class="user_info_value_degree" prop="user_info_value_degrees">
              <el-select
                  v-model="userInformationFormModel.user_info_value_degrees"
                  placeholder="Выбор уровня образования"
                  class="user_info_value_degrees__select"
                  size="large"
                  style="width: 240px"
              >
                <el-option
                    v-for="user_info_degree in user_info_degrees"
                    :key="user_info_degree.user_info_value_degrees"
                    :label="user_info_degree.user_info_value_degrees"
                    :value="user_info_degree.user_info_value_degrees"
                />
              </el-select>
            </el-form-item>
            <el-form-item class="upload-files-button user_info_study_certificate" label="Справка об обучении:" label-width="180px" label-position="left">
              <el-button type="primary">Скачать файл</el-button>
            </el-form-item>
            <el-form-item class="upload-files-button user_info_job_certificate" label="Справка о месте работы:" label-width="180px" label-position="left">
              <el-button type="primary">Скачать файл</el-button>
            </el-form-item>
            <el-form-item class="upload-files-button user_info_consent" label="Согласие:" label-width="180px" label-position="left">
              <el-button type="primary">Скачать файл</el-button>
            </el-form-item>
          </div>
        </el-form>
        <div class="button-container">
          <el-button class="button-confirm" type="primary" @click="saveUserInformationChanges">Сохранить и закрыть</el-button>
          <el-button class="button-cancel" type="info" @click="cancelUserInformationChanges">Отменить изменения</el-button>
        </div>
      </div>
    </div>
  </PrimaryLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PrimaryLayout from '@/layouts/Header-Footer/PrimaryLayout.vue';
import { ElButton, ElForm, ElInput, FormInstance, FormRules } from "element-plus";
import api from "@/api";
import { UserRoleEnum, type UserDTO } from "@/types/users.types";

const userInformationFormModel = ref({
  user_info_fio: '',
  user_info_email: '',
  user_info_number: '',
  user_info_password: '',
  user_info_vuz: '',
  user_info_vuz_direction: '',
  user_info_vuz_code: '',
  user_info_value_courses: '',
  files: [] as File[],
});

const userInformationFormRef = ref<FormInstance>();

const saveUserInformationChanges = () => {
  userInformationFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('Form sent', userInformationFormModel.value);
      console.log(
          userInformationFormModel.value.user_info_fio,
          userInformationFormModel.value.user_info_email,
          userInformationFormModel.value.user_info_number,
          userInformationFormModel.value.user_info_password,
          userInformationFormModel.value.user_info_vuz,
          userInformationFormModel.value.user_info_vuz_direction,
          userInformationFormModel.value.user_info_vuz_code,
          userInformationFormModel.value.user_info_value_courses,
      );
    } else {
      console.error('Form error');
      alert('Заполните недостающие поля!');
    }
  });
};

const user_info_courses = [
  {
    user_info_value_courses: '1',
    user_info_label_courses: '1',
  },
  {
    user_info_value_courses: '2',
    user_info_label_courses: '2',
  },
  {
    user_info_value_courses: '3',
    user_info_label_courses: '3',
  },
  {
    user_info_value_courses: '4',
    user_info_label_courses: '4',
  },
]

const user_info_degrees = [
  {
    user_info_value_degrees: 'Бакалавриат',
    user_info_label_degrees: 'Бакалавриат',
  },
  {
    user_info_value_degrees: 'Специалитет',
    user_info_label_degrees: 'Специалитет',
  },
  {
    user_info_value_degrees: 'Магистратура',
    user_info_label_degrees: 'Магистратура',
  },
]

const rules_users: FormRules = {
  user_info_fio: [
    { required: true, message: 'Пожалуйста, введите фамилию, имя и отчество', trigger: 'blur' },
    { type: 'pattern', pattern: /^[а-яА-ЯёЁ]+$/, message: 'В этом поле должны быть только символы русского алфавита', trigger: ['blur', 'change'] }
  ],
  user_info_email: [
    { required: true, message: 'Пожалуйста, введите почту', trigger: 'blur' },
    { type: 'email', message: 'Почта введена некорректно', trigger: ['blur', 'change'] }
  ],
  user_info_number: [
    { required: true, message: 'Пожалуйста, введите номер телефона', trigger: 'blur' },
    { min: 10, max: 10, message: 'Номер телефона введен некорректно', trigger: ['blur', 'change'] }
  ],
  user_info_vuz: [
    { required: true, message: 'Пожалуйста, введите название ВУЗа', trigger: 'blur' },
  ],
  user_info_password: [
    { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' },
  ],
  user_info_vuz_direction: [
    { required: true, message: 'Пожалуйста, введите направление', trigger: 'blur' },
  ],
  user_info_vuz_code: [
    { required: true, message: 'Пожалуйста, введите код направления', trigger: 'blur' },
    { type: 'pattern', pattern: /^\d{2}\.\d{2}\.\d{2}$/, message: 'Формат должен быть вида XX.XX.XX', trigger: ['blur', 'change'] }
  ],
  user_info_value_courses: [
    { required: true, message: 'Пожалуйста, выберите курс', trigger: 'change' }
  ],
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper__main-container {
  color: black;
  margin: 5% auto;
  padding: 20px;
  box-shadow: 1px 2px 2px 3px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #fff;
  border-radius: 2%;
}

.main-container-name {
  padding-bottom: 20px;
}

.userInformation-form__container .upload-files-button {
  margin-bottom: 0;
}

.userInformation-form {
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(2, 1fr);
}

.userInformation-form-info-container-name {
  margin-bottom: 20px;
}

.button-container {
  margin-top: 20px;
}
</style>