<template>
  <el-scrollbar ref="scrollbarRef" height="100vh" always @scroll="scroll">
    <div class="wrapper-for-correct-viewport">
      <Header/>
      <div class="wrapper">
        <div class="wrapper__main-container">
          <h1 class="main-container-name">Страница жюри</h1>
            <div class="finished-projects-container">
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
      <Footer/>
      </div>
  </el-scrollbar>
</template>


<script lang="ts" setup>
import {ElButton, ElForm, ElInput, ElScrollbar, FormInstance, FormRules} from "element-plus";
import {ref} from "vue";
import Header from "@/layouts/Header/Header.vue";
import Footer from "@/layouts/Footer/Footer.vue";

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

const scroll = ({ scrollTop }) => {
  value.value = scrollTop;
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