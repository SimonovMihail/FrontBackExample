<template>
  <div class="w-100">
    <label :class="LabelClassName" v-if="label">
      {{ label }}
      <Icon class-name="bi bi-patch-question" v-if="hint" class="hint" v-tooltip="hint"></Icon>
    </label>

    <div class="input-group">
      <span v-if="prepend || $slots.prepend" class="input-group-text fs-6">
        {{ prepend }}
        <slot name="prepend"></slot>
      </span>
      <input
        :class="InputClassName"
        :type="type ?? 'text'"
        v-model="value"
        :max="max"
        :min="min"
        @input="(event) => emit('input', event as HTMLTargetEvent)"
        @change="(event) => emit('change', event as HTMLTargetEvent)"
        @focus="emit('focus')"
        @blur="emit('blur')"
        @keydown="(event) => emit('keydown', event as KeyboardEvent)"
        :placeholder="placeholder"
        :disabled="disabled"
      />
      <div class="invalid-feedback">
        {{ error || errorMessage }}
      </div>

      <span v-if="append || $slots.append" class="input-group-text fs-6">
        {{ append }}
        <slot name="append"></slot>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.hint {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  color: #007bff;
}

.custom-tooltip .tooltip-inner {
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  max-width: 450px;
  text-align: left;
}
</style>

<script lang="ts" setup>
import { computed } from 'vue'
import { useField } from 'vee-validate'
import Icon from '../Icon/Icon.vue'

import type { InputProps, InputEmits } from './Input.types'

import type { HTMLTargetEvent } from './Input.types'

const props = defineProps<InputProps>()

const emit = defineEmits<InputEmits>()

defineModel<string>({
  required: false,
})

const { value, errorMessage } = useField(props.name, undefined, {
  validateOnValueUpdate: props.validateOnUpdate ?? false,
  validateOnMount: false,
  controlled: props.noFormControlled ? false : true,
  syncVModel: true,
})

const InputClassName = computed(() => [
  'form-control',
  { 'is-invalid': props.error || errorMessage.value },
  props.className,
])
const LabelClassName = computed(() => ['form-label text-primary', props.labelClassName])
</script>
