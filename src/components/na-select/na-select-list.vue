<template>
  <div
    data-simplebar
    data-simplebar-auto-hide="false"
    ref="root"
    class="na-select__list"
    :class="classes"
    :style="styles"
  >
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
    return { root, styles, classes };
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