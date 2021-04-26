<template>
  <div
    ref="root"
    :value="value"
    class="na-bage"
    :class="classes"
    :style="styles"
    :custom-color="!isColorStyle ? color : ''"
  >
    <span v-if="!dot">{{ displayValue }}</span>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";

import _colors from "../scripts/colors";

export default {
  name: "NaBage",
  props: {
    value: {
      type: [String, Number],
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

    const customBageClass = "na-bage_color_custom-color";

    if (!isColorStyle.value) {
      const customPalette = _colors.createPalette(bage.color);
      const customStyles = document.createElement("style");

      customStyles.innerHTML = `
        [custom-color='${bage.color}'] {
          background: ${customPalette[500]};
        }
        [custom-color='${bage.color}'].na-bage_inverse {
          color: ${customPalette[500]};
          background: white;
        }
      `;
      document.head.appendChild(customStyles);
    }

    const classes = [
      isColorStyle.value ? `na-bage_color_${bage.color}` : customBageClass,
      { "na-bage_inverse": bage.inverse },
      { "na-bage_dot": bage.dot },
    ];

    const styles = [
      +bage.value ? { fontSize: "14px" } : { fontSize: "10px", padding: "6px" },
    ];

    const displayValue = computed(() => {
      let value = bage.value;
      let maxValue = bage.maxValue;
      if (maxValue) {
        value = value > maxValue ? maxValue + "+" : value;
      }
      return value;
    });

    return { displayValue, isColorStyle, classes, styles };
  },
};
</script>

<style lang="scss">
$component: "na-bage";

@mixin color-style($color) {
  &_#{$color} {
    background: var(--color-#{$color});

    &.#{$component}_inverse {
      color: var(--color-#{$color});
      background: white;
    }
  }
}

.#{$component} {
  box-sizing: border-box;
  display: inline-block;
  padding: 3px 6px;
  min-width: 20px;
  height: 20px;
  color: white;
  border-radius: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;

  &_dot {
    padding: 0;
    height: 10px;
    min-width: 10px;
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