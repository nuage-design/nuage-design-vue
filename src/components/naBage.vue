<template>
  <div :value="value" class="na-bage" :class="classes" :style="styles">
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

    const classes = [
      isColorStyle.value
        ? `na-bage_color_${bage.color}`
        : "na-bage_color_custom-color",
      { "na-bage_inverse": bage.inverse },
      { "na-bage_dot": bage.dot },
    ];

    const styles = [
      !bage.inverse
        ? { background: bage.color }
        : { background: "white", color: bage.color },
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

<style>
.na-bage {
  box-sizing: border-box;
  display: inline-block;
  padding: 3px 6px;
  min-width: 20px;
  height: 20px;
  color: white;
  border-radius: 10px;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
}

.na-bage_dot {
  padding: 0;
  height: 10px;
  min-width: 10px;
  border-radius: 50%;
}

.na-bage_color_primary {
  background: #7345f0;
}

.na-bage_color_success {
  background: #4dc74b;
}

.na-bage_color_primary.na-bage_inverse {
  color: #7345f0;
  background: white;
}

.na-bage_color_success.na-bage_inverse {
  color: #4dc74b;
  background: white;
}
</style>