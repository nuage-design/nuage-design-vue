<template>
  <na-select
    :filter="true"
    label="Label"
    placeholder="Select item"
    state="success"
  >
    <template #helper-default>Help me</template>
    <template #helper-success>You are good man!</template>
    <template #helper-warning
      >Don't worry, be happy! Don't worry, be happy!</template
    >
    <template #helper-danger>Блять!</template>
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
import "boxicons";

export default defineComponent({
  name: "App",
  components: {
    NaSelect,
    NaOption,
  },
});
</script>
