<template>
  <button :class="['na-button']" :style="styleObject">
    <slot />
  </button>
</template>

<script>
// import { isColorStyle } from "../scripts/colors";

export default {
  name: "NaButton",
  props: {
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
  data() {
    return {
      componentStyle: {
        colorDefault: "#7345F0",
        colorHover: "#8D68F3",
      },
    };
  },
  computed: {
    styleObject: {
      get: function () {
        return {
          "--color-default": this.componentStyle.colorDefault,
          "--color-hover": this.componentStyle.colorHover,
        };
      },
    },
  },
};
</script>

<style>
.na-button {
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
  background: var(--color-default);
}

.na-button:hover {
  background: var(--color-hover);
}
</style>