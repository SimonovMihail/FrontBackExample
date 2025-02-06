<template>
  <el-scrollbar ref="scrollbarRef" height="100vh" always @scroll="scroll">
    <div class="wrapper-for-correct-viewport">
      <Header/>
      <div class="wrapper">
        <div v-if="isLogin()" class="wrapper__main-container">
          <h1 class="main-container-name">Подать заявку</h1>
          <el-form
              :model="participantEntryFormModel"
              :rules="rules"
              ref="participantEntryFormRef"
              class="participantEntry-form"
              label-width="110px"
              @submit.prevent="submitParticipantEntryForm"
              label-position="left"
          >
            <!-- Сделал табуляцию этой вложенности подальше, т.к. работаю в вебшторме, потом табуляцию уменьшу... -->
            <!-- Помимо атрибута о ширине лейблов в форме, я так же индивидуально настроил эти ширины у некоторых элементов. -->

            <!-- Стараюсь давать нейминг по БЕМу, но могу где-то забывать про него. Нейминг контейнеров с контентом должен быть вида
                 xx-xx-...-info-container -->
            <div class="participantEntry-form__container team-lead-info-container">
              <h3 class="info-container-name">Лидер команды</h3>
              <el-form-item label="ФИО:" label-width="90px" prop="team_lead_fio">
                <el-input class="input-team_lead_fio" v-model="participantEntryFormModel.team_lead_fio" clearable></el-input>
              </el-form-item>
              <el-form-item label="Email:" label-width="90px" prop="team_lead_email">
                <el-input class="input-team_lead_email" v-model="participantEntryFormModel.team_lead_email" clearable></el-input>
              </el-form-item>
              <el-form-item label="Телефон:" label-width="90px" prop="team_lead_number">
                <el-input class="input-team_lead_number" v-model="participantEntryFormModel.team_lead_number" clearable>
                  <template #prepend>+7</template>
                </el-input>
              </el-form-item>
              <el-form-item label="ВУЗ:" label-width="90px" prop="team_lead_vuz">
                <el-input class="input-team_lead_vuz" v-model="participantEntryFormModel.team_lead_vuz" clearable></el-input>
              </el-form-item>
            </div>

            <div class="participantEntry-form__container team-lead-vuz-info-container">
              <h3 class="info-container-name">Направление/специальность и курс лидера</h3>
              <el-form-item label="Направление:" prop="team_lead_vuz_direction"> <!-- В контексте ВУЗа "направление" переводится как "program", но похуй -->
                <el-input class="input-team_lead_vuz_direction" v-model="participantEntryFormModel.team_lead_vuz_direction" clearable></el-input> <!-- "direction" проще воспринимается -->
              </el-form-item>
              <el-form-item label="Код:" prop="team_lead_vuz_code">
                <el-input class="input-code" v-model="participantEntryFormModel.team_lead_vuz_code" clearable></el-input>
              </el-form-item>

              <el-form-item class="team_lead_value_courses" prop="team_lead_value_courses"> <!-- Это выпадающее меню -->
                <el-select
                    v-model="participantEntryFormModel.team_lead_value_courses"
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
              <!-- Я не знаю, как настроить отправку файлов... -->
              <!-- Тему с отправкой файлов потом обсудим со старшаками и бекендом -->
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

            <div class="participantEntry-form__container mentor-info-container">
              <h3 class="info-container-name">Наставник</h3>
              <el-form-item label="ФИО:" label-width="90px" prop="mentor_fio">
                <el-input class="input-mentor_fio" v-model="participantEntryFormModel.mentor_fio" clearable></el-input>
              </el-form-item>
              <el-form-item label="Email:" label-width="90px" prop="mentor_email">
                <el-input class="input-mentor_email" v-model="participantEntryFormModel.mentor_email" clearable></el-input>
              </el-form-item>
              <el-form-item label="Телефон:" label-width="90px" prop="mentor_number">
                <el-input class="input-mentor_number" v-model="participantEntryFormModel.mentor_number" clearable>
                  <template #prepend>+7</template>
                </el-input>
              </el-form-item>
              <!-- По наставникам тоже непонятно. По наброскам в тетради не упомянуто, что наставников будет несколько и их
                   нужно будет добавлять. Но слово "Наставники" я оставлю, потому что так написано. -->
            </div>

            <div class="participantEntry-form__container team-info-container">
              <h3 class="info-container-name">Команда</h3>
              <el-form-item label="Название:" label-width="90px" prop="team_name">
                <el-input class="input-team_name" v-model="participantEntryFormModel.team_name" clearable></el-input>
              </el-form-item>
              <el-form-item label="Описание:" label-width="90px" prop="team_description">
                <el-input class="input-team_description" v-model="participantEntryFormModel.team_description" clearable></el-input>
              </el-form-item>
              <el-form-item class="team_logo" label="Лого:" label-width="90px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
            </div>

            <div class="participantEntry-form__container team-member-info-container">
              <h3 class="info-container-name">Участник 1</h3>
              <el-form-item label="ФИО:" label-width="90px" prop="team_member_fio">
                <el-input class="input-team_member_fio" v-model="participantEntryFormModel.team_member_fio" clearable></el-input>
              </el-form-item>
              <el-form-item label="Email:" label-width="90px" prop="team_member_email">
                <el-input class="input-team_member_email" v-model="participantEntryFormModel.team_member_email" clearable></el-input>
              </el-form-item>
              <el-form-item label="Телефон:" label-width="90px" prop="team_member_number">
                <el-input class="input-team_member_number" v-model="participantEntryFormModel.team_member_number" clearable>
                  <template #prepend>+7</template>
                </el-input>
              </el-form-item>
              <el-form-item class="team_member_add">
                <el-button class="team_member_add__button" type="info" @click="addMember">+ Добавить участника</el-button> <!-- Пока пустышка -->
              </el-form-item>
            </div>

            <div class="participantEntry-form__container team-member-vuz-info-container">
              <h3 class="info-container-name">Направление/специальность и курс участника</h3>
              <el-form-item label="Направление:" prop="team_member_vuz_direction"> <!-- В контексте ВУЗа "направление" переводится как "program", но похуй -->
                <el-input class="input-team_member_vuz_direction" v-model="participantEntryFormModel.team_member_vuz_direction" clearable></el-input> <!-- "direction" проще воспринимается -->
              </el-form-item>
              <el-form-item label="Код:" prop="team_member_vuz_code">
                <el-input class="input-code" v-model="participantEntryFormModel.team_member_vuz_code" clearable></el-input>
              </el-form-item>

              <el-form-item class="team_member_value_courses" prop="team_member_value_courses"> <!-- Это выпадающее меню -->
                <el-select
                    v-model="participantEntryFormModel.team_member_value_courses"
                    placeholder="Выбор курса"
                    size="large"
                    class="team_member_value_courses__select"
                    style="width: 240px"
                > <!-- не трогай этот инлайновый стиль, иначе взрыв -->
                  <el-option
                      v-for="team_member_course in team_member_courses"
                      :key="team_member_course.team_member_value_courses"
                      :label="team_member_course.team_member_value_courses"
                      :value="team_member_course.team_member_value_courses"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="upload-files-button team_member_study_certificate" label="Справка об обучении:" label-width="180px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item class="upload-files-button team_member_job_certificate" label="Справка о месте работы:" label-width="180px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item class="upload-files-button team_member_consent" label="Согласие:" label-width="180px" label-position="left">
                <el-upload v-model:file-list="fileList" :before-upload="handleBeforeUpload">
                  <el-button type="primary">Прикрепить файл</el-button>
                </el-upload>
              </el-form-item>
              <div class="link-container team-member-vuz-info-container__link-container">
                <el-link type="primary">Скачать согласие для заполнения</el-link>
              </div>
            </div>
          </el-form>
          <el-button class="button-confirm" type="primary" @click="submitParticipantEntryForm">Подать заяку</el-button>
        </div>
        <div v-if="!isLogin()" class="wrapper__attention-container">
          <h1 class="attention-container-name">Внимание</h1>
          <p class="attention-container-content">Для возможности подачи заявки необходимо войти в аккаунт.</p>
          <el-button class="attention-container-content__move-to-login-button" type="primary" @click="Move_To_Login()">Войти в аккаунт</el-button>
        </div>
      </div>
      <Footer/>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElForm, ElInput, ElButton, ElScrollbar, FormInstance, FormRules } from 'element-plus';
import Header from '../layouts/Header/Header.vue';
import Footer from '../layouts/Footer/Footer.vue';
import api from "@/api";
import { UserRoleEnum, type UserDTO } from "@/types/users.types";

const router = useRouter();

const user = ref<UserDTO | null>(null);

const participantEntryFormModel = ref({ // Здесь сохранаются данные формы
  team_lead_fio: '',
  team_lead_email: '',
  team_lead_number: '',
  team_lead_vuz: '',
  team_lead_vuz_direction: '',
  team_lead_vuz_code: '',
  team_lead_value_courses: '',
  mentor_fio: '',
  mentor_email: '',
  mentor_number: '',
  team_name: '',
  team_description: '',
  team_member_fio: '',
  team_member_email: '',
  team_member_number: '',
  team_member_vuz_direction: '',
  team_member_vuz_code: '',
  team_member_value_courses: '',
  files: [] as File[],
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
  mentor_fio: [
    { required: true, message: 'Пожалуйста, введите фамилию, имя и отчество', trigger: 'blur' },
    { type: 'pattern', pattern: /^[а-яА-ЯёЁ]+$/, message: 'В этом поле должны быть только символы русского алфавита', trigger: ['blur', 'change'] }
  ],
  mentor_email: [
    { required: true, message: 'Пожалуйста, введите почту', trigger: 'blur' },
    { type: 'email', message: 'Почта введена некорректно', trigger: ['blur', 'change'] }
  ],
  mentor_number: [
    { required: true, message: 'Пожалуйста, введите номер телефона', trigger: 'blur' },
    { min: 10, max: 10, message: 'Номер телефона введен некорректно', trigger: ['blur', 'change'] }
  ],
  team_name: [
    { required: true, message: 'Пожалуйста, введите название команды', trigger: 'blur' },
  ],
  team_description: [ // А надо ли? Может описание опциональным будет?
    { required: true, message: 'Пожалуйста, введите описание команды', trigger: 'blur' },
  ],
  team_member_fio: [
    { required: true, message: 'Пожалуйста, введите фамилию, имя и отчество', trigger: 'blur' },
    { type: 'pattern', pattern: /^[а-яА-ЯёЁ]+$/, message: 'В этом поле должны быть только символы русского алфавита', trigger: ['blur', 'change'] }
  ],
  team_member_email: [
    { required: true, message: 'Пожалуйста, введите почту', trigger: 'blur' },
    { type: 'email', message: 'Почта введена некорректно', trigger: ['blur', 'change'] }
  ],
  team_member_number: [
    { required: true, message: 'Пожалуйста, введите номер телефона', trigger: 'blur' },
    { min: 10, max: 10, message: 'Номер телефона введен некорректно', trigger: ['blur', 'change'] }
  ],
  team_member_vuz_direction: [
    { required: true, message: 'Пожалуйста, введите направление', trigger: 'blur' },
  ],
  team_member_vuz_code: [
    { required: true, message: 'Пожалуйста, введите код направления', trigger: 'blur' },
    { type: 'pattern', pattern: /^\d{2}\.\d{2}\.\d{2}$/, message: 'Формат должен быть вида XX.XX.XX', trigger: ['blur', 'change'] }
  ],
  team_member_value_courses: [
    { required: true, message: 'Пожалуйста, выберите курс', trigger: 'change' }
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
]

const team_member_courses = [
  {
    team_member_value_courses: '1',
    team_member_label_courses: '1',
  },
  {
    team_member_value_courses: '2',
    team_member_label_courses: '2',
  },
  {
    team_member_value_courses: '3',
    team_member_label_courses: '3',
  },
  {
    team_member_value_courses: '4',
    team_member_label_courses: '4',
  },
]

const participantEntryFormRef = ref<FormInstance>();

const submitParticipantEntryForm = () => { // Здесь данные формы отправляются
  participantEntryFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('Form sent', participantEntryFormModel.value);
      console.log(
          participantEntryFormModel.value.team_lead_fio,
          participantEntryFormModel.value.team_lead_email,
          '7' + participantEntryFormModel.value.team_lead_number, // эти семёрки я добавляю потому что отправляются номера телефонов....
          participantEntryFormModel.value.team_lead_vuz,
          participantEntryFormModel.value.vuz_direction,
          participantEntryFormModel.value.code,
          participantEntryFormModel.value.value_courses,
          participantEntryFormModel.value.mentor_fio,
          participantEntryFormModel.value.mentor_email,
          '7' + participantEntryFormModel.value.mentor_number,
          participantEntryFormModel.value.team_member_fio,
          participantEntryFormModel.value.team_member_email,
          '7' + participantEntryFormModel.value.team_member_number,
          participantEntryFormModel.value.team_name,
          participantEntryFormModel.value.team_description,
      );
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

const scroll = ({ scrollTop }) => {
  const value = ref(0);
  value.value = scrollTop;
};

onMounted(async () => {
  const currentUser = await api.users.getCurrentUser();
  user.value = currentUser;
});

function Move_To_Login() {
  router.push({
    path: '/login'
  });
}

function isLogin(): boolean {
  return !(user.value === null);
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

.wrapper__main-container {
  color: black;
  margin: 5% auto;
  padding: 20px;
  box-shadow: 1px 2px 2px 3px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #fff;
  border-radius: 2%;
}

.wrapper__attention-container {
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

.attention-container-name {
  padding-bottom: 20px;
}

.attention-container-content__move-to-login-button {
  margin-top: 25px;
}

.participantEntry-form { /* Эта штука как раз и будет отвечать за гридовое расположение блоков регистрации */
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  /* Раньше здесь была захардкоженое количество строк, но так как предполагается, что участников может быть больше 1, то и строк какое угодно количесто */
}

.participantEntry-form {
  text-align: center;
}

/* ОТСЮДА Я БУДУ ЗАДАВАТЬ СТИЛИ ДЛЯ ЯЧЕЕК И ДЛЯ КОНТЕНТА ЯЧЕЕК */
.info-container-name {
  margin-bottom: 20px;
}

.participantEntry-form__container .upload-files-button {
  margin-bottom: 0;
}

.button-confirm {
  margin-top: 50px;
  width: 300px;
  height: 40px;
  font-size: 18px;
}

/* MEDIA GANG STREET */
@media (max-width: 700px) {
  .participantEntry-form {
    display: block;
  }
}
</style>