<template>
  <button ref="root" class="na-button" :class="classes">
    <span v-if="value">{{ value }}</span>
    <span v-if="rightSide">
      <na-bage v-if="rightSide == 'bage'" :color="color" />
    </span>
  </button>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import naBage from "./naBage";

import _colors from "../scripts/colors";

const STYLES = ["solid", "gradient", "border", "transparent"];

export default {
  name: "NaButton",
  components: {
    naBage,
  },
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
        return STYLES.includes(value);
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