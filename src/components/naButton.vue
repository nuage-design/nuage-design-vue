<template>
  <button ref="root" class="na-button" :class="classes">
    <slot />
  </button>
</template>

<script>
import { ref, reactive, onMounted } from "vue";

import "./styles/na-button.scss";

const STYLES = ["solid", "border", "transparent"];

export default {
  name: "NaButton",
  props: {
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
    lightText: {
      type: Boolean,
      default: false,
    },
    equal: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const button = reactive(props);

    const root = ref(null);

    onMounted(() => {
      const elem = root.value;
      const active = elem.classList.contains("na-button_active");

      if (button.style == "solid" || active) {
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
      `na-button_style_${button.style}`,
      button.color ? `na-button_color_${button.color}` : "",
      { "na-button_light-text": button.lightText },
      { "na-button_active": button.active },
      { "na-button_disabled": button.disabled },
      { "na-button_equal": button.equal },
    ];

    return { button, root, classes };
  },
};
</script>