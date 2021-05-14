<template>
  <na-select native>
    <na-option>123</na-option>
    <na-option>123</na-option>
    <na-option>123</na-option>
    <na-option>123</na-option>
    <na-option>123</na-option>
  </na-select>
</template>

<script lang="ts">
// fast tests
import { defineComponent } from "vue";
import { NaSelect, NaOption } from "./components/na-select";

export default defineComponent({
  name: "App",
  components: {
    NaSelect,
    NaOption,
  },
});
</script>
