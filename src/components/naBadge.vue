<template>
  <div
    ref="root"
    class="na-badge"
    :class="classes"
    :style="styles"
    :custom-color="!isColorStyle ? color : null"
  >
    <span class="na-badge__text" v-if="!dot">{{ displayValue }}</span>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";

import _colors from "../scripts/colors";

export default {
  name: "NaBadge",
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
    const badge = reactive(props);
    const isColorStyle = ref(_colors.isColorStyle(badge.color));

    const root = ref(null);

    onMounted(() => {
      const elem = root.value;

      if (badge.inverse) {
        _colors.colorInversion(elem);
      }

      if (!isColorStyle.value) {
        const customPalette = _colors.createPalette(badge.color);

        if (customPalette) {
          elem.style.background = customPalette[500];
          elem.style.color = "white";
        }
      }
    });

    const styles = [
      badge.value < 10 &&
      badge.value >= 0 &&
      badge.value !== null &&
      badge.value !== "" &&
      !badge.dot
        ? { width: "20px", height: "20px", padding: "0" }
        : null,
    ];

    const classes = [
      isColorStyle.value
        ? `na-badge_color_${badge.color}`
        : "na-badge_color_custom-color",
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

    return { displayValue, isColorStyle, classes, styles, root };
  },
};
</script>

<style lang="scss">
$component: "na-badge";

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