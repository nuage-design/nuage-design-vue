<template>
  <div
    class="na-button-group"
    :class="{ 'na-button-group--vertical': vertical }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NaButtonGroup',
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>