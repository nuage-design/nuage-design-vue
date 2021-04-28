<template>
  <div
    ref="root"
    class="na-bage"
    :class="classes"
    :style="styles"
    :custom-color="!isColorStyle ? color : null"
  >
    <span class="na-bage__text" v-if="!dot">{{ displayValue }}</span>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";

import _colors from "../scripts/colors";

export default {
  name: "NaBage",
  props: {
    value: {
      type: [String, Number, Object],
      default: null,
    },
    maxValue: {
      type: Number,
      default: 99,
    },
    color: {
      type: String,
      default: "primary",
    },
    inverse: {
      type: Boolean,
      default: false,
    },
    dot: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const bage = reactive(props);
    const isColorStyle = ref(_colors.isColorStyle(bage.color));

    const root = ref(null);

    onMounted(() => {
      const elem = root.value;

      if (bage.inverse) {
        _colors.colorInversion(elem);
      }

      if (!isColorStyle.value) {
        const customPalette = _colors.createPalette(bage.color);

        if (customPalette) {
          elem.style.background = customPalette[500];
          elem.style.color = "white";
        }
      }
    });

    const styles = [
      bage.value < 10 &&
      bage.value >= 0 &&
      bage.value !== null &&
      bage.value !== "" &&
      !bage.dot
        ? { width: "20px", height: "20px", padding: "0" }
        : null,
    ];

    const classes = [
      isColorStyle.value
        ? `na-bage_color_${bage.color}`
        : "na-bage_color_custom-color",
      { "na-bage_inverse": bage.inverse },
      { "na-bage_dot": bage.dot || bage.value === null || bage.value === "" },
    ];

    const displayValue = computed(() => {
      let value = bage.value;
      let maxValue = bage.maxValue;

      if (maxValue) {
        value = value > maxValue ? maxValue + "+" : value;
      }

      return value;
    });

    return { displayValue, isColorStyle, classes, styles, root };
  },
};
</script>

<style lang="scss">
$component: "na-bage";

@mixin color-style($color) {
  &_#{$color} {
    background: var(--color-#{$color});
  }
}

.#{$component} {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 20px;
  color: white;
  border-radius: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  width: 20px;
  padding: 0 8px;
  min-width: max-content;

  &__text {
    text-align: center;
  }

  &_dot {
    padding: 0;
    height: 10px;
    width: 10px;
    border-radius: 50%;
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