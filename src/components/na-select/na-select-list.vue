<template>
  <div class="na-select__list" :class="{ 'na-select__list_opened': opened }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NaSelectList",
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>
