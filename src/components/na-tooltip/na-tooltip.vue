<template lang="pug">
.na-tooltip
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    position: {
      type: String,
      default: null,
    },
  },
})
</script>

<style lang="scss">
.na-tooltip {
  background-color: var(--dark-800);
  display: inline-block;
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Nunito Sans', sans-serif;
  line-height: 100%;
}
</style>