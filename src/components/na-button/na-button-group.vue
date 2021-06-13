<template>
  <div
    :class="[
      'na-button-group',
      { 'na-button-group--vertical': vertical },
      { 'na-button-group--block': block },
    ]"
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
    block: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>