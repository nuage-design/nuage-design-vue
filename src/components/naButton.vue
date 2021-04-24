<template>
  <button
    :class="[
      'na-button',
      isColorStyle
        ? `na-button_color_${color}`
        : 'na-button_color_custom-color',
    ]"
    :style="{ background: color }"
  >
    <slot />
  </button>
</template>

<script>
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
      default: "success",
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
  computed: {
    buttonColor() {
      return this.color;
    },
  },
  methods: {
    isColorStyle() {
      return ["primary", "success", "warning", "danger", "dark"].includes(
        this.color
      );
    },
  },
};
</script>

<style>
.na-button {
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
}

.na-button_color_primary {
  background: #7345f0;
}

.na-button_color_success {
  background: #4dc74b;
}
</style>