<template>
  <div
    ref="root"
    class="na-badge"
    :class="classes"
    :custom-color="!isColorStyle ? color : null"
  >
    <span class="na-badge__text" v-if="!dot">{{ displayValue }}</span>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";

import _colors from "../scripts/colors";
import "./styles/na-badge.scss";

export default {
  name: "NaBadge",
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
    const badge = reactive(props);
    const isColorStyle = ref(_colors.isColorStyle(badge.color));

    const root = ref(null);

    onMounted(() => {
      const elem = root.value;

      if (badge.inverse) {
        _colors.colorInversion(elem);
      }
    });

    const classes = [
      `na-badge_color_${badge.color}`,
      { "na-badge_inverse": badge.inverse },
      {
        "na-badge_dot": badge.dot || badge.value === null || badge.value === "",
      },
    ];

    const displayValue = computed(() => {
      let value = badge.value;
      let maxValue = badge.maxValue;

      if (maxValue) {
        value = value > maxValue ? maxValue + "+" : value;
      }

      return value;
    });

    return { displayValue, isColorStyle, classes, root };
  },
};
</script>