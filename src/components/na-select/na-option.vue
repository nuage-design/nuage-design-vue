<template>
  <button ref="root" class="na-option" @click="activate" tabindex="-1">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
export default {
  name: "NaOption",
  props: {
    active: Boolean,
  },
  setup(props) {
    const option = reactive(props);
    const root = ref<HTMLButtonElement>();

    const classes = ref([{ "na-option_active": option.active }]);

    const activate = () => root.value?.classList.toggle("na-option_active");
    return { classes, activate, root };
  },
};
</script>