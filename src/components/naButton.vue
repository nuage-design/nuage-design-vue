<template>
  <button ref="root" class="na-button" :class="classes">
    <slot />
  </button>
</template>

<script>
import { ref, reactive, onMounted } from "vue";

import _colors from "../scripts/colors";

const STYLES = ["solid", "gradient", "border", "transparent"];

export default {
  name: "NaButton",
  props: {
    style: {
      type: String,
      default: "solid",
      validator: (value) => {
        return STYLES.includes(value);
      },
    },
    color: {
      type: String,
      default: "primary",
    },
    equal: {
      type: Object,
    },
  },
  setup(props) {
    const button = reactive(props);
    const isColorStyle = ref(_colors.isColorStyle(button.color));

    const root = ref(null);

    onMounted(() => {
      const elem = root.value;

      if (!isColorStyle.value) {
        const customPalette = _colors.createPalette(button.color);

        if (customPalette) {
          elem.style.background = customPalette[500];
          elem.style.color = "white";
        }
      }
    });

    const classes = [
      isColorStyle.value
        ? `na-button_color_${button.color}`
        : "na-button_color_custom-color",
    ];

    return { button, root, classes };
  },
};
</script>
<style lang="scss">
$component: "na-button";

@mixin color-style($color) {
  &_#{$color} {
    background: var(--color-#{$color});
  }
}

.#{$component} {
  font-size: 14px;
  font-weight: 600;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 21px;
  height: 42px;
  border-radius: 14px;
  cursor: pointer;
  border: none;
  color: white;

  & > * {
    margin-left: 4px;
    margin-right: 4px;

    &:nth-child(1) {
      margin-left: 0;
    }

    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
  &_color {
    @include color-style("primary");
    @include color-style("success");
    @include color-style("warning");
    @include color-style("danger");
    @include color-style("dark");
    @include color-style("info");
  }
}
</style>