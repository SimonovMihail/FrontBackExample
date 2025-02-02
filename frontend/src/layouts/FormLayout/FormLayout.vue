<script lang="ts" setup>
import { computed } from 'vue'

import type { FormLayoutProps } from './FormLayout.types'

const props = defineProps<FormLayoutProps>()

const FormLayoutClassName = computed(() => ['form-layout p-3 rounded-3 shadow', props.className])
</script>

<template>
  <form :class="FormLayoutClassName">
    <slot></slot>
  </form>
</template>

<style lang="scss">
.form-layout {
  width: 400px;
  background-color: #ffffff;

  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
  gap: 12px;
}
</style>
