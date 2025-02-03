<template>
  <!--footer-------------------------------------------------------------------------------------------------------------------->
  <el-footer class="main-header">
    <el-row type="flex" justify="center" :gutter="20">
      <div>
        <a href="https://www.tyuiu.ru/">
          <img src="../assets/img/logo_bot.png" alt="">
        </a>
      </div>      
      <div>
        <h2>Контакты</h2>
        <h3 class="number">8 (***) ***-**-**</h3> 
        <p class="mail">Help@mail.ru</p>
        </div>
      </el-row>
  </el-footer>
  <!--end-footer-------------------------------------------------------------------------------------------------------------------->

</template>

<script lang="ts" setup>

</script>


<style scoped>
  .main-header {
  height: auto;
  margin: 5px;
  background: linear-gradient(to right, #0fa4e9, #4338ca);
  border-radius: 20px;
  }

  div{
    padding: 20px;
  }

  .el-row {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .img-col{
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .LK{
    padding: 10px;
  }

  .logo{
    margin: 0px 15px;
  }
  .number{
    margin: 0px 15px;
  }

  .mail{
    margin: 0px 15px;
  } 
  img{
    width: 150px;
  }
</style>
