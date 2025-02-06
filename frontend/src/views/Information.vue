<template>
<el-scrollbar ref="scrollbarRef" height="100vh" always @scroll="scroll">
  <Header/>
  <!--main-------------------------------------------------------------------------------------------------------------------->
  <el-main>

    <!--декаративный-блок-с-информацией-------------------------------------------------------------------------------------------------------------------->
    <el-row  justify="center" class="banner">
      <div class="empty">

      </div>

      <div class="banner_text">
          <h1 class="baner_text">
            Хакатон
          </h1>
          <h2 class="baner_text" id="baner_text">
            Цифровые двойники в энергетике
          </h2>
        <el-button type="primary" plain round @click="Move_To_ParticipantEntry()">Подать заявку</el-button>
      </div>
    </el-row>
    <!--конец-------------------------------------------------------------------------------------------------------------------->

    <!--текстовая-информация------------------------------------------------------------------------------------------------------------------->
    <el-row type="flex" justify="center" class="info-text">
      <el-col  :span="22" >
        <h1>Задача Хакатона</h1>
        <div class="info-text__description">
          <p>Командам необходимо создать цифровую модель энергетической системы месторождения и предложить оптимальный алгоритм управления источниками выработки энергии, минимизирующие ее себестоимость, как тепловой, так и электрической.</p>
          <p>Схема энергоснабжения месторождения может быть комбинированной, включающая в себя разновидности генерирующих установок на газовом топливе, других видах топлива, а также внешние сети и источники питания</p>
        </div>
      </el-col>
    </el-row>
    <!--конец-------------------------------------------------------------------------------------------------------------------->

    <!--Этапы-------------------------------------------------------------------------------------------------------------------->
    <el-row  justify="center" class="stages-bg">
    
    

      <el-col  :span="24" class="img-col" id="stages">
        <h1>Этапы</h1>
      </el-col>
      <div>
        <el-icon :size="50" class="passed"><Monitor /></el-icon>
        <el-button type="primary" circle disabled>1</el-button>
        <span>Регистрация участников</span>
      </div>
      <div>
        <el-icon :size="50" class="next"><Monitor /></el-icon>
        <el-button type="primary" circle disabled>2</el-button>
        <span>Рассылка данных для выполнения задания</span>
      </div>
      <div>
        <el-icon :size="50" class="later"><Monitor /></el-icon>
        <el-button type="primary" circle disabled>3</el-button>
        <span>Прием решений</span>
      </div>
      <div>
        <el-icon :size="50" class="later"><Monitor /></el-icon>
        <el-button type="primary" circle disabled>4</el-button>
        <span>Проверка решений</span>
      </div>
      <div>
        <el-icon :size="50" class="later"><Monitor /></el-icon>
        <el-button type="primary" circle disabled>5</el-button>
        <span>Онлайн защита</span>
      </div>
      <div>
        <el-icon :size="50" class="later"><Monitor /></el-icon>
        <el-button type="primary" circle disabled>6</el-button>
        <span>Публикация результатов</span>
      </div>
      <div>
        <el-icon :size="50" class="later"><Monitor /></el-icon>
        <el-button type="primary" circle disabled>7</el-button>
        <span>Награждение</span>
      </div>
    </el-row>
    <!--конец-------------------------------------------------------------------------------------------------------------------->

  </el-main>
  <!--end-main-------------------------------------------------------------------------------------------------------------------->
  <Footer/>
  </el-scrollbar>
</template>



<script lang="ts" setup>
  import { ref } from 'vue'
  import { ElScrollbar } from 'element-plus'
  import Header from "@/layouts/Header/Header.vue";
  import Footer from "@/layouts/Footer/Footer.vue";
  import {useRouter} from "vue-router";
  const router = useRouter();
  const value = ref(0)
  const scroll = ({ scrollTop }) => {
    value.value = scrollTop
  }

  function Move_To_ParticipantEntry() {
    router.push({
      path: `/participantEntry`
    });
  }
</script>


<style scoped>


.banner {
  display: block;
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/fon1.jpg");
  background-position: center;
  background-repeat: no-repeat; 
  background-size: 100%;  
  border-radius: 20px;
}

.empty{
  height: 400px;
}

.banner_text{
  background: #14324e9c;
  border-radius: 20px;
}

.baner_text{
  padding-left: 20px;
}

#baner_text{
  padding-bottom: 20px;
}


.wrapper-for-correct-viewport { /* Оставлю как напоминание, т.к. если налепить как на других страницах, верстка ломается */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.info-text {
  color: black;
}

h1 {
  font-size: 50px;
}

span{
  font-size: 20px;
}

.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}

.img-col {
  margin-top: 10px;
  margin-bottom: 10px;
}

#stages {
  text-align: center;
}

 
.img {
  width: 100%;
  border-radius: 20px;
}

/* Тут я сделать буквы абзацев по-больше и разделил их для лучшей читабельности. */
.info-text__description p {
  font-size: 20px;
  margin-bottom: 10px;
}
/* ...А также убрал у последнего абзаца лишний маргин. */
.info-text__description p:last-child {
  margin-bottom: 0;
}

.stages-bg {
  display: block;
  padding: 10px;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #0fa4e9, #4338ca);
  border-radius: 20px;
}

.butb{
  margin-left: 20px;
  margin-bottom: 20px;
}

.el-button{
  margin-bottom: 40px;
  margin-left: 5px;
}

span{
  margin-left: 5px;
  position: absolute;
  margin-top: inherit;
}


.passed{
  color: rgb(0, 255, 0);
}

.next{
  color: #ffffff;
}

.later{
  color: #a9a9a9;
}

</style>