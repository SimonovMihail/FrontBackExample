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
          <!-- Помимо атрибута о ширине лейблов в форме, я так же индивидуально настроил эти ширины у некоторых элементов. -->

          <!-- Стараюсь давать нейминг по БЕМу, но могу где-то забывать про него. Нейминг контейнеров с контентом должен быть вида
               xx-xx-...-info-container -->
          <div class="userInformation-form__container team-lead-info-container">
            <h3 class="userInformation-form-info-container-name">Основные данные</h3>
            <el-form-item label="ФИО:" label-width="90px" prop="user_info_fio">
              <el-input class="input-user_info_fio" v-model="userInformationFormModel.user_info_fio" clearable></el-input>
            </el-form-item>
            <el-form-item label="Email:" label-width="90px" prop="user_info_email">
              <el-input class="input-user_info_email" v-model="userInformationFormModel.user_info_email" clearable></el-input>
            </el-form-item>
            <el-form-item label="Пароль:" label-width="90px" prop="user_info_password">
              <el-input class="input-user_info_password" v-model="userInformationFormModel.user_info_password" clearable></el-input>
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
              <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                <el-button type="primary">Прикрепить файл</el-button>
              </el-upload>
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

            <el-form-item class="user_info_value_courses" prop="user_info_value_courses"> <!-- Это выпадающее меню -->
              <el-select
                  v-model="userInformationFormModel.user_info_value_courses"
                  placeholder="Выбор курса"
                  class="user_info_value_courses__select"
                  size="large"
                  style="width: 240px"
              > <!-- не трогай этот инлайновый стиль, иначе взрыв -->
                <el-option
                    v-for="user_info_course in user_info_courses"
                    :key="user_info_course.user_info_value_courses"
                    :label="user_info_course.user_info_value_courses"
                    :value="user_info_course.user_info_value_courses"
                />
              </el-select>
            </el-form-item>
            <el-form-item class="upload-files-button user_info_study_certificate" label="Справка об обучении:" label-width="180px" label-position="left">
              <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                <el-button type="primary">Прикрепить файл</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item class="upload-files-button user_info_job_certificate" label="Справка о месте работы:" label-width="180px" label-position="left">
              <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                <el-button type="primary">Прикрепить файл</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item class="upload-files-button user_info_consent" label="Согласие:" label-width="180px" label-position="left">
              <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                <el-button type="primary">Прикрепить файл</el-button>
              </el-upload>
            </el-form-item>
          </div>
        </el-form>
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
</script>

<style scoped>

</style>