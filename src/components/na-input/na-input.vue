<template>
  <label>
    <span v-if="label" ref="label" class="na-input__label">{{ label }}</span>
    <input ref="input" class="na-input" :placeholder="placeholder" />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NaInput',
  props: {
    placeholder: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
  },
  setup() {
    return {}
  },
})
</script>
