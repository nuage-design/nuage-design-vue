<template>
  <div
    :class="[
      'na-bage',
      isColorStyle
        ? `na-bage_color_${bageColor}`
        : 'na-bage_color_custom-color',
      { 'na-bage_inverse': inverse },
    ]"
  >
    <span class="na-bage__text"><slot /></span>
  </div>
</template>

<script>
import { isColorStyle } from "../scripts/colors";

export default {
  name: "NaBage",
  props: {
    color: {
      type: String,
      default: "primary",
    },
    inverse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      bageColor: this.color,
    };
  },
  methods: {
    isColorStyle() {
      return isColorStyle(this.color);
    },
  },
};
</script>

<style>
.na-bage {
  box-sizing: border-box;
  display: inline-block;
  padding: 3px 5.5px;
  height: 20px;
  color: white;
  border-radius: 10px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
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