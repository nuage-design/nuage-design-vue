<template>
  <div
    ref="root"
    class="na-select__list"
    :class="{ 'na-select__list_opened': opened }"
    :style="styles"
  >
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
  },
  setup() {
    const root = ref<HTMLElement>();
    const styles = ref("");
    onMounted(() => {
      const width = root.value?.offsetWidth;
      console.log(width);
      if (width) styles.value += `min-width: ${width + 33}px;`;
    });
    return { root, styles };
  },
});
</script>
