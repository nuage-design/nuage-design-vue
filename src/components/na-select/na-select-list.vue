<template>
  <div ref="root" class="na-select__list" :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "NaSelectList",
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
    activeItem: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const root = ref<HTMLElement>();
    const classes = ref({ "na-select__list_opened": props.opened });
    const styles = ref("");
    onMounted(() => {
      // const width = root.value?.offsetWidth;
      // if (width) styles.value += `min-width: ${width + 40}px;`;
    });
    return { root, styles, classes };
  },
});
</script>

<style lang="scss">
</style>