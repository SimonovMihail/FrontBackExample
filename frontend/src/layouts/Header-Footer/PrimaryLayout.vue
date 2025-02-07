<template>
  <el-scrollbar ref="scrollbarRef" height="100vh" always @scroll="scroll">
    <div class="wrapper-for-correct-viewport">
      <Header/>
      <slot></slot>
      <Footer/>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
  import Header from "./Header.vue";
  import Footer from "./Footer.vue";
  import {ElScrollbar} from "element-plus";
  import {ref} from "vue";

  const value = ref(0);

  const scroll = ({ scrollTop }) => {
    value.value = scrollTop;
  };
</script>

<style scoped>
.wrapper-for-correct-viewport {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  gap: 10px;
}
</style>