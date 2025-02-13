<template>
  <PrimaryLayout>
    <div class="wrapper">
      <div class="wrapper__main-container">
        <h1 class="main-container-name">Страница администратора</h1>
        <div class="content-container">
          <div class="team-list-container">
            <h3 class="team-list-container__name">Список команд</h3>
            <div class="teams_list_container">
              <el-scrollbar class="scrollbar-content" height="400px">
                <p v-for="team in teams_list" :key="team.id" class="team-item"><span>{{ team.team_name }}</span>
                  <el-button class="button-open-team-information">Посмотреть заявку</el-button>
                </p>
              </el-scrollbar>
            </div>
          </div>
          <div class="user-list-container">
            <h3 class="user-list-container__name">Список пользователей</h3>
            <div v-if="listTypeSelect === 'all'" class="users_list_container">
              <el-scrollbar class="scrollbar-content" height="400px">
                <p v-for="user in users_list" :key="user.id" class="user-item"><span>{{ user.fullName }}</span>
                  <el-button class="button-open-user-information">Посмотреть информацию</el-button>
                </p>
              </el-scrollbar>
            </div>
            <div v-if="listTypeSelect === 'valid_users'" class="valid_users_list_container">
              <el-scrollbar class="scrollbar-content" height="400px">
                <p v-for="user in valid_users_list" :key="user.id" class="user-item"><span>{{ user.fullName }}</span>
                  <el-button class="button-open-user-information">Посмотреть информацию</el-button>
                </p>
              </el-scrollbar>
            </div>
            <div v-if="listTypeSelect === 'non_valid_users'" class="non_valid_users_list_container">
              <el-scrollbar class="scrollbar-content" height="400px">
                <p v-for="user in non_valid_users_list" :key="user.id" class="user-item"><span>{{ user.fullName }}</span>
                  <el-button class="button-open-user-information">Посмотреть информацию</el-button>
                </p>
              </el-scrollbar>
            </div>
            <div v-if="listTypeSelect === 'judges'" class="judges_list_container">
              <el-scrollbar class="scrollbar-content" height="400px">
                <p v-for="user in judges_list" :key="user.id" class="user-item"><span>{{ user.fullName }}</span>
                  <el-button class="button-open-user-information">Посмотреть информацию</el-button>
                </p>
              </el-scrollbar>
            </div>
            <div v-if="listTypeSelect === 'admins'" class="admins_list_container">
              <el-scrollbar class="scrollbar-content" height="400px">
                <p v-for="user in admins_list" :key="user.id" class="user-item"><span>{{ user.fullName }}</span>
                  <el-button class="button-open-user-information">Посмотреть информацию</el-button>
                </p>
              </el-scrollbar>
            </div>
            <el-radio-group class="list-type-radio-group-container" v-model="listTypeSelect" size="normal">
              <el-radio-button label="Все пользователи" value="all"/>
              <el-radio-button label="Проверенные" value="valid_users"/>
              <el-radio-button label="Не проверенные" value="non_valid_users"/>
              <el-radio-button label="Жюри" value="judges"/>
              <el-radio-button label="Админы" value="admins"/>
            </el-radio-group>
          </div>
          <div class="finished-projects-container">
            <h3 class="finished-projects-container__name">Список готовых работ</h3>
            <div class="works_list_container">
              <el-scrollbar class="scrollbar-content" height="400px">
                <p v-for="work in works_list" :key="work.id" class="finished-project-item"><span>{{ work.team_name }}</span>
                  <el-button class="download-finished-project-button">Скачать работу</el-button>
                </p>
              </el-scrollbar>
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
import api from '@/api';
import {type UserDTO, UserRoleEnum} from '@/types/users.types';

const listTypeSelect = ref('all');

const users_list = ref<UserDTO[] | null>(null);
const valid_users_list = ref<UserDTO[] | null>(null);
const non_valid_users_list = ref<UserDTO[] | null>(null);
const admins_list = ref<UserDTO[] | null>(null);
const judges_list = ref<UserDTO[] | null>(null);
const teams_list = ref<UserDTO[] | null>(null);
const works_list = ref<UserDTO[] | null>(null);

onMounted(async () => {
  const result = await api.users.useUsersList();

  // Полный список всех пользователей (включая админов и жюри)
  users_list.value = result.map(user => ({ ...user }));

  // Список проверенных пользователей
  valid_users_list.value = result.filter(
      user => user.user_valid && !(user.roles.map(({ name }) => name).includes(UserRoleEnum.ADMIN)) &&
          !(user.roles.map(({ name }) => name).includes(UserRoleEnum.JUDGE))
  );

  // Список непроверенных пользователей
  non_valid_users_list.value = result.filter(
      user => !user.user_valid && !(user.roles.map(({ name }) => name).includes(UserRoleEnum.ADMIN)) &&
          !(user.roles.map(({ name }) => name).includes(UserRoleEnum.JUDGE))
  );

  // Список админов
  admins_list.value = result.filter(user => user.roles.map(({ name }) => name).includes(UserRoleEnum.ADMIN))

  // Список жюри
  judges_list.value = result.filter(user => user.roles.map(({ name }) => name).includes(UserRoleEnum.JUDGE))

  // Список команд (entry_sent === true)
  teams_list.value = result.filter(user => user.entry_sent);

  // Список команд (entry_sent === true)
  works_list.value = result.filter(user => user.work_sent);
});

// const finishedProjectsGradesFormModel = ref({
//   grade: '',
// });

// const finishedProjectsGradesFormRef = ref<FormInstance>();

// const saveFinishedProjectsGrades = () => {
//   finishedProjectsGradesFormRef.value?.validate((valid) => {
//     if (valid) {
//       console.log('Form sent', finishedProjectsGradesFormModel.value);
//       console.log(
//           finishedProjectsGradesFormModel.value.grade,
//       );
//     } else {
//       console.error('Form error');
//       alert('Заполните недостающие поля с оценками!');
//     }
//   });
// };

// const value = ref(0);

// const checkGradeCorrection = function(rule: any, value: any, callback: any) {
//   const number = Number(value);
//   if (isNaN(number)) {
//     callback(new Error("Значение должно быть числом"));
//   }
//   else if (number < 1 || number > 50) {
//     callback(new Error("Оценка только от 1 до 50"));
//   }
// };
//
// const rules_grades: FormRules = {
//   grade: [
//     { required: true, message: "Введите оценку", trigger: 'blur' },
//     { validator: checkGradeCorrection, trigger: 'blur' },
//   ],
// };


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

.list-type-radio-group-container {
  margin-top: 10px;
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