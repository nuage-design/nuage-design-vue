<template>
  <div class="na-button-group" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "NaButtonGroup",
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const buttonGroup = reactive(props);
    const classes = [{ "na-button-group_vertical": buttonGroup.vertical }];
    return { buttonGroup, classes };
  },
};
</script>