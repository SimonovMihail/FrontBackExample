<template>
  <el-scrollbar ref="scrollbarRef" height="100vh" always @scroll="scroll">
    <div class="wrapper-for-correct-viewport">
      <Header/>
      <div class="common-layout">
        <el-container>
          <el-aside width="20%">
            
          </el-aside>

          <el-main>
            <div class="stages-bg">
              <el-avatar :size="100"
                         src="https://avatars.mds.yandex.net/i?id=a58aa42c311bff2d24a063699f0a546bfc2db3996a074653-12471101-images-thumbs&n=13"
              />
              <el-divider border-style="double" />
              <h1>ФИО</h1>
              <el-divider border-style="double" />
              <h1>Учебное заведение</h1>
              <el-divider border-style="double" />
              <h1>номер телефона</h1>
              <el-divider border-style="double" />
              <h1>Почта</h1>
              <el-divider border-style="double" />
              <div>
                <el-button type="primary" plain round @click="Move_To_Userdata_Edit">Редактировать профиль</el-button> <!-- Переход на страницу редактирования -->
              </div>
            </div>

            <div class="button_use">
              <el-button type="primary" plain round @click="Move_To_ChangeParticipantEntry()">Редактировать заявку</el-button>
            </div>
          </el-main>


          <el-aside width="20%">
          
          </el-aside>

        </el-container>
      </div>
      <Footer/>
    </div>
  </el-scrollbar>
</template>


<script lang="ts" setup>
  import Header from "@/layouts/Header/Header.vue";
  import Footer from "@/layouts/Footer/Footer.vue";
  import { ref } from 'vue'
  import { ElScrollbar } from 'element-plus'
  
  import { Calendar } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router';

  const router = useRouter();

  const valueS = ref(0)

  const scroll = ({ scrollTop }) => {
    valueS.value = scrollTop
  }

  function Move_To_Userdata_Edit() {
    router.push({
      path: '/lk_userdata_edit'
    });
  }

  function Move_To_ChangeParticipantEntry() {
    router.push({
      path: `/changeParticipantEntry`
    });
  }


</script>
   
   
<style scoped>

.el-button{
  margin-bottom: 20px;
}

.el-aside{
  color: black;
}

.white-text-fix {
  color: #303133;
}

.wrapper-for-correct-viewport { /* Чтобы пофиксить ту хуйню с отрыванием футера */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  gap: 10px;
}

.stages-bg {
  border: 5px solid #3980FF;
  background: #5b97ff;  
  border-radius: 20px;
  text-align: center;
}

.button_use{
  padding-top: 20px;
  text-align: center;
}

h1 {
  font-size: 30px;
  margin: 10px;
}
</style>