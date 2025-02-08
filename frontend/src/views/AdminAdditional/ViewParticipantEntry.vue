<template>
  <PrimaryLayout>
    <div class="wrapper">
      <div class="wrapper__main-container">
        <h1 class="main-container-name">Просмотр заявки</h1>
        <el-form
            :model="viewParticipantEntryFormModel"
            :rules="rules"
            ref="viewParticipantEntryFormRef"
            class="viewParticipantEntry-form"
            label-width="110px"
            @submit.prevent="saveParticipantEntryForm"
            label-position="left"
        >
          <!-- Сделал табуляцию этой вложенности подальше, т.к. работаю в вебшторме, потом табуляцию уменьшу... -->
          <!-- Помимо атрибута о ширине лейблов в форме, я так же индивидуально настроил эти ширины у некоторых элементов. -->

          <!-- Стараюсь давать нейминг по БЕМу, но могу где-то забывать про него. Нейминг контейнеров с контентом должен быть вида
               xx-xx-...-info-container -->
          <div class="viewParticipantEntry-form__container team-lead-info-container">
            <h3 class="info-container-name">Лидер команды</h3>
            <el-form-item label="ФИО:" label-width="90px" prop="team_lead_fio">
              <el-input class="input-team_lead_fio" v-model="viewParticipantEntryFormModel.team_lead_fio" clearable></el-input>
            </el-form-item>
            <el-form-item label="Email:" label-width="90px" prop="team_lead_email">
              <el-input class="input-team_lead_email" v-model="viewParticipantEntryFormModel.team_lead_email" clearable></el-input>
            </el-form-item>
            <el-form-item label="Телефон:" label-width="90px" prop="team_lead_number">
              <el-input class="input-team_lead_number" v-model="viewParticipantEntryFormModel.team_lead_number" clearable>
                <template #prepend>+7</template>
              </el-input>
            </el-form-item>
            <el-form-item label="ВУЗ:" label-width="90px" prop="team_lead_vuz">
              <el-input class="input-team_lead_vuz" v-model="viewParticipantEntryFormModel.team_lead_vuz" clearable></el-input>
            </el-form-item>
          </div>

          <div class="viewParticipantEntry-form__container team-lead-vuz-info-container">
            <h3 class="info-container-name">Направление/специальность и курс лидера</h3>
            <el-form-item label="Направление:" prop="team_lead_vuz_direction"> <!-- В контексте ВУЗа "направление" переводится как "program", но похуй -->
              <el-input class="input-team_lead_vuz_direction" v-model="viewParticipantEntryFormModel.team_lead_vuz_direction" clearable></el-input> <!-- "direction" проще воспринимается -->
            </el-form-item>
            <el-form-item label="Код:" prop="team_lead_vuz_code">
              <el-input class="input-code" v-model="viewParticipantEntryFormModel.team_lead_vuz_code" clearable></el-input>
            </el-form-item>

            <el-form-item class="team_lead_value_courses" prop="team_lead_value_courses"> <!-- Это выпадающее меню -->
              <el-select
                  v-model="viewParticipantEntryFormModel.team_lead_value_courses"
                  placeholder="Выбор курса"
                  class="team_lead_value_courses__select"
                  size="large"
                  style="width: 240px"
              > <!-- не трогай этот инлайновый стиль, иначе взрыв -->
                <el-option
                    v-for="team_lead_course in team_lead_courses"
                    :key="team_lead_course.team_lead_value_courses"
                    :label="team_lead_course.team_lead_value_courses"
                    :value="team_lead_course.team_lead_value_courses"
                />
              </el-select>
            </el-form-item>
            <el-form-item class="upload-files-button team_lead_study_certificate" label="Справка об обучении:" label-width="180px" label-position="left">
              <el-button type="primary">Скачать файл</el-button>
            </el-form-item>
            <el-form-item class="upload-files-button team_lead_job_certificate" label="Справка о месте работы:" label-width="180px" label-position="left">
              <el-button type="primary">Скачать файл</el-button>
            </el-form-item>
            <el-form-item class="upload-files-button team_lead_consent" label="Согласие:" label-width="180px" label-position="left">
              <el-button type="primary">Скачать файл</el-button>
            </el-form-item>
          </div>

          <div class="viewParticipantEntry-form__container mentor-info-container">
            <h3 class="info-container-name">Наставник</h3>
            <div>
              <el-scrollbar class="scrollbar-content" height="120px">
                <!-- ТУТ БУДЕТ ПОЯВЛЯТЬСЯ НАСТАВНИК -->
              </el-scrollbar>
            </div>
          </div>

          <div class="viewParticipantEntry-form__container team-info-container">
            <h3 class="info-container-name">Команда</h3>
            <el-form-item label="Название:" label-width="90px" prop="team_name">
              <el-input class="input-team_name" v-model="viewParticipantEntryFormModel.team_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="Девиз:" label-width="90px" prop="team_description">
              <el-input class="input-team_description" v-model="viewParticipantEntryFormModel.team_description" clearable></el-input>
            </el-form-item>
            <el-form-item class="team_logo" label="Лого:" label-width="90px" label-position="left">
              <el-button type="primary">Скачать файл</el-button>
            </el-form-item>
          </div>

          <div class="viewParticipantEntry-form__container team-member-info-container">
            <h3 class="info-container-name">Участники команды</h3>
            <div>
              <el-scrollbar class="scrollbar-content" height="100px">
                <!-- ТУТ БУДУТ ПОЯВЛЯТЬСЯ ПОЛЬЗОВАТЕЛИ -->
              </el-scrollbar>
            </div>
          </div>
        </el-form>
        <div class="button-container">
          <el-button class="button-confirm" type="primary" @click="saveParticipantEntryForm">Сохранить и закрыть</el-button>
          <el-button class="button-cancel" type="info" @click="cancelParticipantEntryForm">Отменить изменения</el-button>
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

const viewParticipantEntryFormModel = ref({ // Здесь сохранаются данные формы
  team_lead_fio: '',
  team_lead_email: '',
  team_lead_number: '',
  team_lead_vuz: '',
  team_lead_vuz_direction: '',
  team_lead_vuz_code: '',
  team_lead_value_courses: '',
  team_name: '',
  team_description: '',
});

const rules: FormRules = {
  team_lead_fio: [
    { required: true, message: 'Пожалуйста, введите фамилию, имя и отчество', trigger: 'blur' },
    { type: 'pattern', pattern: /^[а-яА-ЯёЁ]+$/, message: 'В этом поле должны быть только символы русского алфавита', trigger: ['blur', 'change'] }
  ],
  team_lead_email: [
    { required: true, message: 'Пожалуйста, введите почту', trigger: 'blur' },
    { type: 'email', message: 'Почта введена некорректно', trigger: ['blur', 'change'] }
  ],
  team_lead_number: [
    { required: true, message: 'Пожалуйста, введите номер телефона', trigger: 'blur' },
    { min: 10, max: 10, message: 'Номер телефона введен некорректно', trigger: ['blur', 'change'] }
  ],
  team_lead_vuz: [
    { required: true, message: 'Пожалуйста, введите название ВУЗа', trigger: 'blur' },
  ],
  team_lead_vuz_direction: [
    { required: true, message: 'Пожалуйста, введите направление', trigger: 'blur' },
  ],
  team_lead_vuz_code: [
    { required: true, message: 'Пожалуйста, введите код направления', trigger: 'blur' },
    { type: 'pattern', pattern: /^\d{2}\.\d{2}\.\d{2}$/, message: 'Формат должен быть вида XX.XX.XX', trigger: ['blur', 'change'] }
  ],
  team_lead_value_courses: [
    { required: true, message: 'Пожалуйста, выберите курс', trigger: 'change' }
  ],
  team_name: [
    { required: true, message: 'Пожалуйста, введите название команды', trigger: 'blur' },
  ],
  team_description: [ // А надо ли? Может описание опциональным будет?
    { required: true, message: 'Пожалуйста, введите описание команды', trigger: 'blur' },
  ],
};

const team_lead_courses = [
  {
    team_lead_value_courses: '1',
    team_lead_label_courses: '1',
  },
  {
    team_lead_value_courses: '2',
    team_lead_label_courses: '2',
  },
  {
    team_lead_value_courses: '3',
    team_lead_label_courses: '3',
  },
  {
    team_lead_value_courses: '4',
    team_lead_label_courses: '4',
  },
];

const viewParticipantEntryFormRef = ref<FormInstance>();

const saveParticipantEntryForm = () => { // Здесь данные формы отправляются
  viewParticipantEntryFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('Form sent', viewParticipantEntryFormModel.value);
      console.log(
          viewParticipantEntryFormModel.value.team_lead_fio,
          viewParticipantEntryFormModel.value.team_lead_email,
          '7' + viewParticipantEntryFormModel.value.team_lead_number,
          viewParticipantEntryFormModel.value.team_lead_vuz,
          viewParticipantEntryFormModel.value.team_lead_vuz_direction,
          viewParticipantEntryFormModel.value.team_lead_vuz_code,
          viewParticipantEntryFormModel.value.team_lead_value_courses,
          viewParticipantEntryFormModel.value.team_name,
          viewParticipantEntryFormModel.value.team_description,
      );
    } else {
      console.error('Form error');
      alert('Заполните недостающие поля!');
    }
  });
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

.viewParticipantEntry-form {
  display: grid;
  text-align: center;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
      "team-lead-info-container team-lead-vuz-info-container"
      "mentor-info-container team-info-container"
      "team-member-info-container team-member-info-container";
}

.button-container {
  margin-top: 20px;
}

/* ОТСЮДА Я БУДУ ЗАДАВАТЬ СТИЛИ ДЛЯ ЯЧЕЕК И ДЛЯ КОНТЕНТА ЯЧЕЕК */
.info-container-name {
  margin-bottom: 20px;
}

/* GRID AREA STREET */
.team-lead-info-container {
  grid-area: team-lead-info-container
}

.team-lead-vuz-info-container {
  grid-area: team-lead-vuz-info-container
}

.mentor-info-container {
  grid-area: mentor-info-container
}

.team-info-container {
  grid-area: team-info-container
}

.team-member-info-container {
  grid-area: team-member-info-container
}

/* СКРОЛЛБАРЫ И ПРОЧЕЕ */
.scrollbar-content {
  outline: 1px solid #d5d5d5;
  padding: 5px;
  border-radius: 2%;
}
</style>