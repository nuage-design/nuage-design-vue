<template>
  <button ref="root" class="na-button" :class="classes">
    <slot />
  </button>
</template>

<script>
import { ref, reactive, onMounted } from "vue";

import _colors from "../scripts/colors";

const STYLES = ["solid", "gradient", "border", "transparent"];

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
    const isColorStyle = ref(_colors.isColorStyle(button.color));

    const root = ref(null);

    onMounted(() => {
      const elem = root.value;

      if (!isColorStyle.value) {
        const customPalette = _colors.createPalette(button.color);

        if (customPalette) {
          elem.style.background = customPalette[500];
          elem.style.color = "white";
        }
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
      button.color ? `na-button_color_${button.color}` : "",
      { "na-button_active": button.active },
      { "na-button_disabled": button.disabled },
      { "na-button_equal": button.equal },
    ];

    return { button, root, classes };
  },
};
</script>
<style lang="scss">
$component: "na-button";

@mixin color-style($component, $color) {
  &_#{$color} {
    background: var(--color-#{$color});

    .na-badge {
      background: white;
      color: var(--color-#{$color});
    }

    &:hover {
      background: var(--color-#{$color}-400);

      .na-badge {
        color: var(--color-#{$color}-400);
      }
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 5px var(--color-#{$color}-100);
      background: var(--color-#{$color}-400);

      .na-badge {
        color: var(--color-#{$color}-400);
      }
    }

    &:active {
      background: var(--color-#{$color}-600);
      box-shadow: 0 0 0 5px var(--color-#{$color}-200);

      .na-badge {
        color: var(--color-#{$color}-600);
      }
    }

    &.#{$component}_active {
      background: var(--color-#{$color}-400);

      .na-badge {
        color: var(--color-#{$color}-400);
      }
    }

    &.#{$component}_disabled {
      background: var(--color-#{$color}-100);

      .na-badge {
        color: var(--color-#{$color}-100);
      }

      &:hover {
        cursor: not-allowed;
      }
    }
  }
}

.#{$component} {
  font-size: 14px;
  font-weight: 600;
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
  transition: 0.1s;

  & > * {
    margin-left: 4px;
    margin-right: 4px;

    &:nth-child(1) {
      margin-left: 0;
    }

    &:nth-last-child(1) {
      margin-right: 0;
    }
  }

  &_color {
    @include color-style($component, "primary");
    @include color-style($component, "success");
    @include color-style($component, "info");
    @include color-style($component, "warning");
    @include color-style($component, "danger");
    @include color-style($component, "dark");
  }

  &_equal {
    font-size: 20px;
    padding: 9px 9px;
    width: 42px;
  }
}
</style>