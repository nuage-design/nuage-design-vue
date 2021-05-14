<template>
  <ul class="na-select__list">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NaSelectList",
  props: {},
  setup() {
    return {};
  },
});
</script>
