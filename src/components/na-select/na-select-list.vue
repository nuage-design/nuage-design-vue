<template>
  <div data-simplebar ref="root" class="na-select__list" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "simplebar";
import "simplebar/dist/simplebar.css";

export default defineComponent({
  name: "NaSelectList",
  props: {
    activeItem: {
      type: Number,
      default: null,
    },
  },
  setup() {
    const root = ref<HTMLElement>();
    const styles = ref("");
    return { root, styles };
  },
});
</script>

<style lang="scss">
.simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
  top: 8px;
  bottom: 8px;
}

.simplebar-scrollbar.simplebar-visible:before {
  opacity: 1;
}

.simplebar-scrollbar::before {
  background: var(--color-primary-transparent);
  left: 0px;
  right: 4px;
}
</style>