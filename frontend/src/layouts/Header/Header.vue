<template>
  <!--header-------------------------------------------------------------------------------------------------------------------->
  <el-header class="main-header">
        <el-row type="flex" justify="center" :gutter="20">
          <img src="../../assets/img/logo_top.png" alt="" @click=Main()>
          <el-col :span="9" :offset="7" > <!-- Спаном можешь больше места кнопкам выделить -->
            <div class="row-bg">
              <el-button type="primary" plain round @click="Move_To_Judge()">Страница жюри</el-button>
              <el-button type="primary" plain round @click="Move_To_Admin()">Админка</el-button>
              <el-button type="primary" plain round @click="Move_To_ChangeParticipantEntry()">Редактировать заявку</el-button>
              <el-button type="primary" plain round @click="Move_To_ParticipantEntry()">Подать заявку</el-button>
              <el-button type="primary" plain round @click="Move_To_Login()">Вход</el-button>
              <div class="lk-button">
                <el-button type="primary" plain circle class="lk-button__avatar">
                  <el-avatar :size="25"
                             src="https://avatars.mds.yandex.net/i?id=a58aa42c311bff2d24a063699f0a546bfc2db3996a074653-12471101-images-thumbs&n=13"
                  />
                </el-button>
                <ul class="lk-button__avatar-dropdown-menu">
                  <li class="avatar-dropdown-menu__item1" @click="Move_To_Lk()">Личный кабинет</li>
                  <li class="avatar-dropdown-menu__item2" @click="">Выйти</li> <!-- Тут должна быть функция выхода из учётной записи -->
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!--src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"-->
      <!--end-header-------------------------------------------------------------------------------------------------------------------->
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

function Move_To_Lk() {
  router.push({
    path: `/lk`
  });
}

function Main() {
  router.push({
    path: `/`
  });
}

function Move_To_ChangeParticipantEntry() {
  router.push({
    path: `/changeParticipantEntry`
  });
}
 
function Move_To_ParticipantEntry() {
  router.push({
    path: `/participantEntry`
  });
}

function Move_To_Login() {
  router.push({
    path: '/login'
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


// Эта конструкция отвечает за функцию открывания и закрывания выпадающей менюшки
// Одним кликом и открываешь и закрываешь
onMounted(() => {
  const avatarButton = document.querySelector('.lk-button__avatar') as HTMLElement;
  const menu = document.querySelector('.lk-button__avatar-dropdown-menu') as HTMLElement;

  avatarButton?.addEventListener('click', () => {
    if (menu) { // чекает что существует ли вообще эта переменная menu (не является нулом или андефайндом)
      if (menu.style.display === 'block') {
        menu.style.display = 'none';
      } else {
        menu.style.display = 'block';
      }
    }
  });
});
</script>

<style scoped>
.main-header {
  height: auto;
  margin: 10px;
  background: linear-gradient(to right, #0fa4e9, #4338ca);
  border-radius: 20px;
}

.row-bg {
  width: 100%;
}

.lk-button {
  position: relative;
  display: inline-block;
  padding-left: 15px;
}

.lk-button__avatar-dropdown-menu {
  z-index: 1; /* Чтобы под контент не залезал а всегда был над всем. УЧИТЫВАЙ */
  display: none;
  user-select: none; /* Текст кнопок не выделяется (ибо нахуй) */
  position: absolute;
  width: 180px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.avatar-dropdown-menu__item1, .avatar-dropdown-menu__item2 {
  cursor: pointer;
  color: #409eff;
  text-decoration: none;
  padding: 8px 14px;
  border: 1px solid #e5e5e5;
  background-color: white;
}

.avatar-dropdown-menu__item2 {
  color: #ff4040
}

.avatar-dropdown-menu__item1:hover, .avatar-dropdown-menu__item2:hover {
  background-color: #ececec;
}

.avatar-dropdown-menu__item1:active, .avatar-dropdown-menu__item2:active {
  background-color: #d8d8d8;
}

.el-row { /* без неё хуня будет, не удаляй */
  padding-top: 20px;
  padding-bottom: 20px;
}

img {
  height: 60px;
}

.el-button{
  margin-bottom: 10px;
}


@media (max-width: 1365px) {
  img {
    height: 40px;
  }
}

@media (max-width: 952px) {
  
}
</style>
