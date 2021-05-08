<template>
  <button ref="root" class="na-button" :class="classes">
    <slot />
  </button>
</template>

<script>
import { ref, reactive, onMounted } from "vue";

const sizes = ["mini", "small", "medium", "large"];
const types = ["rounded", "rect", "circle"];
const styles = ["solid", "border", "transparent"];

export default {
  name: "NaButton",
  props: {
    size: {
      type: String,
      default: "medium",
      validator: (value) => {
        return sizes.includes(value);
      },
    },
    type: {
      type: String,
      default: "rounded",
      validator: (value) => {
        return types.includes(value);
      },
    },
    buttonStyle: {
      type: String,
      default: "solid",
      validator: (value) => {
        return styles.includes(value);
      },
    },
    color: {
      type: String,
      default: "primary",
    },
    lightText: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    equal: {
      type: Boolean,
      default: false,
    },
    space: {
      type: [String, Number],
      default: 8,
    },
  },
  setup(props) {
    const button = reactive(props);
    const root = ref(null);

    onMounted(() => {
      const elem = root.value;
      const active = elem.classList.contains("na-button_active");

      elem.style.setProperty(
        "--space",
        +button.space ? button.space + "px" : button.space
      );

      if (button.buttonStyle === "solid" || active) {
        const badges = elem.querySelectorAll(".na-badge");

        badges.forEach((badge) => {
          badge.classList.add("na-badge_inverse");
        });
      }

      if (button.equal) {
        const firstItem = elem.firstElementChild;
        let text = firstItem.innerText;

        if (text) firstItem.innerText = text[0];

        // badge styling
        if (firstItem.classList.contains("na-badge")) {
          firstItem.innerText = "";
          firstItem.classList.add("na-badge_dot");
        }

        elem.innerHTML = "";
        elem.append(firstItem);
      }
    });

    const classes = [
      `na-button_size_${button.size}`,
      `na-button_type_${button.type}`,
      `na-button_style_${button.buttonStyle}`,
      `na-button_color_${button.color}`,
      { "na-button_light-text": button.lightText },
      { "na-button_active": button.active },
      { "na-button_equal": button.equal },
      { "na-button_block": button.block },
    ];

    return { button, root, classes };
  },
};
</script>