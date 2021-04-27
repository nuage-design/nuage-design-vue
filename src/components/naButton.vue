<template>
  <button ref="root" class="na-button" :class="classes">
    <span v-if="value">{{ value }}</span>
  </button>
</template>

<script>
import { ref, reactive, onMounted } from "vue";

import _colors from "../scripts/colors";

export default {
  name: "NaButton",
  props: {
    value: {
      type: [String, Number],
      requier: false,
      default: null,
    },
    style: {
      type: String,
      default: "solid",
      validator: (value) => {
        return ["solid", "gradient", "border", "transparent"].includes(value);
      },
    },
    color: {
      type: String,
      default: "primary",
    },
    leftSide: {
      type: Object,
      default: function () {
        return { type: null };
      },
    },
    rightSide: {
      type: Object,
      default: function () {
        return { type: null };
      },
    },
    equal: {
      type: Object,
      default: function () {
        return { type: null };
      },
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
      { "na-button_inverse": button.inverse },
      { "na-button_dot": button.dot },
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