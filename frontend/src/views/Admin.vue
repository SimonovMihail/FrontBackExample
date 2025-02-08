<template>
  <PrimaryLayout>
    <div class="wrapper">
      <div class="wrapper__main-container">
        <h1 class="main-container-name">Страница администратора</h1>
        <div class="content-container">
          <div class="team-list-container">
            <h3 class="team-list-container__name">Список команд</h3>
            <div>
              <el-scrollbar class="scrollbar-content" height="400px">
                <p class="team-item team-item__1"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__2"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__3"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__4"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__5"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__6"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__7"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__8"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__9"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
                <p class="team-item team-item__10"><span>"Большая команда"</span>
                  <el-button class="button-open-team-information">Посмотреть информацию</el-button>
                </p>
              </el-scrollbar>
            </div>
          </div>

          <div class="user-list-container">
            <h3 class="user-list-container__name">Список пользователей</h3>
            <div>
              <el-form
                  :model="userRolesFormModel"
                  ref="userRolesFormRef"
                  class="user-roles-form"
                  @submit.prevent="saveUserRoles"
              >
                <el-scrollbar class="scrollbar-content" height="400px">
                  <p class="user-item user-item__1"><span>Иванов Иван Иванович</span>
                    <el-button class="button-open-user-information">Посмотреть информацию</el-button>
                    <el-form-item class="roles1_value" prop="roles1_value"> <!-- Это выпадающее меню -->
                      <el-select
                          v-model="userRolesFormModel.roles1_value"
                          placeholder="Выбор роли"
                          size="medium"
                          class="roles1_value__select"
                          style="width: 120px"
                      > <!-- не трогай этот инлайновый стиль, иначе взрыв -->
                        <el-option
                            v-for="role1 in roles1"
                            :key="role1.roles1_value"
                            :label="role1.roles1_value"
                            :value="role1.roles1_value"
                        />
                      </el-select>
                    </el-form-item>
                  </p>
                  <p class="user-item user-item__2"><span>Тамарова Тамара Тамаровна</span>
                    <el-button class="button-open-user-information">Посмотреть информацию</el-button>
                    <el-form-item class="roles2_value" prop="roles2_value"> <!-- Это выпадающее меню -->
                      <el-select
                          v-model="userRolesFormModel.roles2_value"
                          placeholder="Выбор роли"
                          size="medium"
                          class="roles2_value__select"
                          style="width: 120px"
                      > <!-- не трогай этот инлайновый стиль, иначе взрыв -->
                        <el-option
                            v-for="role2 in roles2"
                            :key="role2.roles2_value"
                            :label="role2.roles2_value"
                            :value="role2.roles2_value"
                        />
                      </el-select>
                    </el-form-item>
                  </p>
                </el-scrollbar>
              </el-form>
            </div>
            <div class="button-container-users">
              <el-button class="button-confirm-users" type="primary" @click="saveUserRoles">Сохранить роли</el-button>
              <el-button class="button-cancel-users" type="info" @click="cancelUserRoles">Отменить изменения</el-button>
            </div>
          </div>

          <div class="finished-projects-container">
            <h3 class="finished-projects-container__name">Список готовых работ</h3>
            <el-form
                :model="finishedProjectsGradesFormModel"
                ref="finishedProjectsGradesFormRef"
                class="finished-projects-grades-form"
                :rules="rules_grades"
                @submit.prevent="saveFinishedProjectsGrades"
            >
              <el-scrollbar class="scrollbar-content" height="400px">
                <p class="finished-project-item finished-project-item__1"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item"  prop="grade1">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade1"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__2"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade2">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade2"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__3"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade3">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade3"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__4"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade4">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade4"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__5"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade5">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade5"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__6"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade6">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade6"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__7"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade7">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade7"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__8"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade8">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade8"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__9"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade9">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade9"></el-input>
                  </el-form-item>
                </p>
                <p class="finished-project-item finished-project-item__10"><span>"Большая команда"</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                  <el-form-item class="grade-item" prop="grade10">
                    <el-input class="input-grade" placeholder="Оценка" v-model="finishedProjectsGradesFormModel.grade10"></el-input>
                  </el-form-item>
                </p>
              </el-scrollbar>
            </el-form>
            <div class="button-container-grades">
              <el-button class="button-confirm-grades" type="primary" @click="saveFinishedProjectsGrades">Сохранить оценки</el-button>
              <el-button class="button-cancel-grades" type="info" @click="cancelFinishedProjectsGrades">Отменить изменения</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PrimaryLayout>
</template>


<script lang="ts" setup>
import {ElButton, ElForm, ElInput, ElScrollbar, FormInstance, FormRules} from "element-plus";
import PrimaryLayout from '../layouts/Header-Footer/PrimaryLayout.vue';
import {onMounted, ref} from 'vue';

const userRolesFormModel = ref({
  roles1_value: 'Участник',
  roles2_value: 'Участник',
});

const roles1 = [
  {
    roles1_value: 'Участник',
    roles1_label: 'Участник',
  },
  {
    roles1_value: 'Жюри',
    roles1_label: 'Жюри',
  },
  {
    roles1_value: 'Админ',
    roles1_label: 'Админ',
  },
]

const roles2 = [
  {
    roles2_value: 'Участник',
    roles2_label: 'Участник',
  },
  {
    roles2_value: 'Жюри',
    roles2_label: 'Жюри',
  },
  {
    roles2_value: 'Админ',
    roles2_label: 'Админ',
  },
]

const userRolesFormRef = ref<FormInstance>();

const saveUserRoles = () => {
  userRolesFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('Form sent', userRolesFormModel.value);
      console.log(
          userRolesFormModel.value.roles1_value,
          userRolesFormModel.value.roles2_value,
      );
    } else {
      console.error('Form error');
      alert('Выберите роли пользователям!');
    }
  });
};

const finishedProjectsGradesFormModel = ref({
  grade1: '',
  grade2: '',
  grade3: '',
  grade4: '',
  grade5: '',
  grade6: '',
  grade7: '',
  grade8: '',
  grade9: '',
  grade10: '',
});

const finishedProjectsGradesFormRef = ref<FormInstance>();

const saveFinishedProjectsGrades = () => {
  finishedProjectsGradesFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('Form sent', finishedProjectsGradesFormModel.value);
      console.log(
          finishedProjectsGradesFormModel.value.grade1,
          finishedProjectsGradesFormModel.value.grade2,
          finishedProjectsGradesFormModel.value.grade3,
          finishedProjectsGradesFormModel.value.grade4,
          finishedProjectsGradesFormModel.value.grade5,
          finishedProjectsGradesFormModel.value.grade6,
          finishedProjectsGradesFormModel.value.grade7,
          finishedProjectsGradesFormModel.value.grade8,
          finishedProjectsGradesFormModel.value.grade9,
          finishedProjectsGradesFormModel.value.grade10,
      );
    } else {
      console.error('Form error');
      alert('Заполните недостающие поля с оценками!');
    }
  });
};

const value = ref(0);

const checkGradeCorrection = function(rule: any, value: any, callback: any) {
  const number = Number(value);
  if (isNaN(number)) {
    callback(new Error("Значение должно быть числом"));
  }
  else if (number < 1 || number > 50) {
    callback(new Error("Оценка только от 1 до 50"));
  }
}

const rules_grades: FormRules = {
  grade1: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade2: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade3: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade4: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade5: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade6: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade7: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade8: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade9: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
  grade10: [
    { required: true, message: "Введите оценку", trigger: 'blur' },
    { validator: checkGradeCorrection, trigger: 'blur' },
  ],
};
</script>


<style scoped>
.scrollbar-content {
  outline: 1px solid #d5d5d5;
  padding: 5px;
  border-radius: 2%;
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

.content-container {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, auto);
  grid-template-areas:
        "team-list-container user-list-container finished-projects-container";
  text-align: center;
}

.team-list-container__name, .user-list-container__name, .finished-projects-container__name {
  margin-bottom: 20px;
}

/* GRID AREA STREET NIGGA */
.team-list-container {
  grid-area: team-list-container;
}

.user-list-container {
  grid-area: user-list-container;
}

.finished-projects-container {
  grid-area: finished-projects-container;
}
/* END OF GRID AREA STREET */

.download-finished-project-button {
  margin-left: 15px;
}

.team-item, .user-item, .finished-project-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  background-color: #ededed;
}

.grade-item, .roles1_value, .roles2_value {
  position: relative;
  top: 9px;
}

.roles1_value, .roles2_value {
  margin-left: 10px;
}

.button-open-user-information {
  margin-left: 15px;
}

.button-open-team-information {
  margin-left: 15px;
}

.team-item:last-child, .user-item:last-child, .finished-project-item:last-child {
  margin-bottom: 0;
}

.team-item:first-child, .user-item:first-child, .finished-project-item:first-child {
  margin-top: 0;
}

.input-grade {
  width: 70px;
  margin-left: 15px;
}

.button-container-users {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button-container-grades {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button-confirm-users, .button-cancel-users {
  width: 100%;
}

.button-confirm-grades, .button-cancel-grades {
  width: 100%;
}

.teamInformation-form__container .upload-files-button {
  margin-bottom: 0;
}

.userInformation-form__container .upload-files-button {
  margin-bottom: 0;
}

/* MEDIA GANG STREET */
@media (max-width: 1365px) {
  .content-container {
    grid-template-columns: repeat(2, auto);
    grid-template-areas:
        "team-list-container user-list-container"
        "finished-projects-container finished-projects-container";
  }
}

@media (max-width: 952px) {
  .content-container {
    display: block;
  }

  .user-list-container {
    margin-top: 20px;
  }

  .finished-projects-container {
    margin-top: 20px;
  }
}
</style>