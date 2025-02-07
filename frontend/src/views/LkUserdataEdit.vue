<template>
  <PrimaryLayout>
    <div class="wrapper">
      <div class="wrapper__main-container">
        <h1 class="main-container-name">Редактировать профиль</h1>
        <el-form
            :model="editDataFormModel"
            :rules="rules"
            ref="editDataFormRef"
            class="editData-form"
            label-width="110px"
            @submit.prevent="submitEditDataForm"
            label-position="left"
        >
          <!-- Помимо атрибута о ширине лейблов в форме, я так же индивидуально настроил эти ширины у некоторых элементов. -->

          <!-- Стараюсь давать нейминг по БЕМу, но могу где-то забывать про него. Нейминг контейнеров с контентом должен быть вида
               xx-xx-...-info-container -->
          <div class="editData-form__container team-lead-info-container">
            <h3 class="info-container-name">Основные данные</h3>
            <el-form-item label="ФИО:" label-width="90px" prop="team_lead_fio">
              <el-input class="input-team_lead_fio" v-model="editDataFormModel.team_lead_fio" clearable></el-input>
            </el-form-item>
            <el-form-item label="Email:" label-width="90px" prop="team_lead_email">
              <el-input class="input-team_lead_email" v-model="editDataFormModel.team_lead_email" clearable></el-input>
            </el-form-item>
            <el-form-item label="Телефон:" label-width="90px" prop="team_lead_number">
              <el-input class="input-team_lead_number" v-model="editDataFormModel.team_lead_number" clearable>
                <template #prepend>+7</template>
              </el-input>
            </el-form-item>
            <el-form-item label="ВУЗ:" label-width="90px" prop="team_lead_vuz">
              <el-input class="input-team_lead_vuz" v-model="editDataFormModel.team_lead_vuz" clearable></el-input>
            </el-form-item>
            <el-form-item class="upload-files-button team_lead_pfp" label="Загрузить аватарку:" label-width="140px" label-position="left">
              <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                <el-button type="primary">Прикрепить файл</el-button>
              </el-upload>
            </el-form-item>
          </div>

          <div class="editData-form__container team-lead-vuz-info-container">
            <h3 class="info-container-name">Направление/специальность и курс</h3>
            <el-form-item label="Направление:" prop="team_lead_vuz_direction"> <!-- В контексте ВУЗа "направление" переводится как "program", но похуй -->
              <el-input class="input-team_lead_vuz_direction" v-model="editDataFormModel.team_lead_vuz_direction" clearable></el-input> <!-- "direction" проще воспринимается -->
            </el-form-item>
            <el-form-item label="Код:" prop="team_lead_vuz_code">
              <el-input class="input-code" v-model="editDataFormModel.team_lead_vuz_code" clearable></el-input>
            </el-form-item>

            <el-form-item class="team_lead_value_courses" prop="team_lead_value_courses"> <!-- Это выпадающее меню -->
              <el-select
                  v-model="editDataFormModel.team_lead_value_courses"
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
              <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                <el-button type="primary">Прикрепить файл</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item class="upload-files-button team_lead_job_certificate" label="Справка о месте работы:" label-width="180px" label-position="left">
              <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                <el-button type="primary">Прикрепить файл</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item class="upload-files-button team_lead_consent" label="Согласие:" label-width="180px" label-position="left">
              <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                <el-button type="primary">Прикрепить файл</el-button>
              </el-upload>
            </el-form-item>
            <div class="link-container team-lead-vuz-info-container__link-container">
              <el-link type="primary">Скачать согласие для заполнения</el-link>
            </div>
          </div>
        </el-form>
        <el-button class="button-confirm" type="primary" @click="submitEditDataForm">Сохранить изменения</el-button>
        <el-button class="button-confirm" type="info" @click="cancelEditDataForm">Отменить изменения</el-button>
      </div>
    </div>
  </PrimaryLayout>
</template>


<script lang="ts" setup>
  import PrimaryLayout from '../layouts/Header-Footer/PrimaryLayout.vue';
  import { ref } from 'vue'
  import {ElButton, ElForm, ElInput, FormInstance, FormRules} from 'element-plus'

  const editDataFormModel = ref({ // Здесь сохранаются данные формы
    team_lead_fio: '',
    team_lead_email: '',
    team_lead_number: '',
    team_lead_vuz: '',
    team_lead_vuz_direction: '',
    team_lead_vuz_code: '',
    team_lead_value_courses: '',
    files: [] as File[],
  });

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
  ]

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
  };

  const editDataFormRef = ref<FormInstance>();

  const submitEditDataForm = () => { // Здесь данные формы отправляются
    editDataFormRef.value?.validate((valid) => {
      if (valid) {
        console.log('Form sent', editDataFormModel.value);
      } else {
        console.error('Form error');
        alert('Заполните недостающие поля!');
      }
    });
  };

  const fileList = ref<File[]>([]);

  const handleBeforeUpload = (file: File) => {
    const isLt2M = file.size / 1024 / 1024 < 2; // проверяем, меньше ли размер файла 2 МБ
    if (!isLt2M) {
      alert('Размер файла не должен превышать 2 МБ!');
    }
    return isLt2M; // если true, файл загружается; если false, загрузка отменяется
  };

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

.editData-form {
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(2, 1fr);
}

.info-container-name {
  margin-bottom: 20px;
}

.editData-form__container .upload-files-button {
  margin-bottom: 0;
}

.button-confirm {
  margin-top: 20px;
  width: 300px;
  height: 40px;
  font-size: 18px;
}
</style>