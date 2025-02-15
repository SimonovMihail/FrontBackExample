<template>
  <PrimaryLayout>
    <div class="wrapper">
      <div class="wrapper__main-container">
        <h1 class="main-container-name">Страница жюри</h1>
        <div class="works_list_container">
          <el-scrollbar class="scrollbar-content" height="400px">
            <p v-for="work in works_list" :key="work.id" class="finished-project-item"><span>{{ work.team_name }}</span>
              <el-button class="download-finished-project-button">Скачать работу</el-button>
            </p>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </PrimaryLayout>
</template>


<script lang="ts" setup>
import {ElButton, ElScrollbar} from "element-plus";
import {onMounted, ref} from "vue";
import PrimaryLayout from '../layouts/Header-Footer/PrimaryLayout.vue';
import type {UserDTO} from "@/types/users.types.ts";
import api from "@/api";

const works_list = ref<UserDTO[] | null>(null);

onMounted(async() => {
  const result = await api.users.useUsersList();

  works_list.value = result.filter(user => user.work_sent);
})
</script>


<style scoped>
.wrapper-for-correct-viewport { /* Чтобы пофиксить ту хуйню с отрыванием футера */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  gap: 10px;
}

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
  padding: 20px;
  box-shadow: 1px 2px 2px 3px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #fff;
  border-radius: 2%;
}

.main-container-name {
  padding-bottom: 20px;
}

.download-finished-project-button {
  margin-left: 15px;
}

.finished-project-item {
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

.grade-item {
  position: relative;
  top: 9px;
}

.finished-project-item:last-child {
  margin-bottom: 0;
}

.finished-project-item:first-child {
  margin-top: 0;
}

.input-grade {
  width: 70px;
  margin-left: 15px;
}

.button-container-grades {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button-confirm-grades, .button-cancel-grades {
  width: 100%;
}
</style>