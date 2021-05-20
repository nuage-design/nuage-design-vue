<template>
  <div
    ref="root"
    class="na-select"
    @click="focus"
    v-outside="blur"
    :style="styles"
    :class="`na-select_state_${state}`"
  >
    <span
      v-if="displayLabel"
      ref="selectLabel"
      class="na-select__label"
      :class="{ 'na-select__label_placeholder': labelPlaceholder }"
    >
      {{ displayLabel }}
    </span>
    <div class="na-select__input__chevron">
      <i ref="icon" class="bx bxs-chevron-down"></i>
    </div>

    <template v-if="filter && !native">
      <input
        :value="inputValue"
        ref="input"
        @focus="focus"
        class="na-select__input"
        :placeholder="!labelPlaceholder ? placeholder : ''"
      />
      <na-select-list
        ref="selectList"
        class="na-select__list"
        :class="{ 'na-select__list_opened': opened }"
      >
        <slot></slot>
      </na-select-list>
    </template>
    <select
      v-else
      ref="input"
      @focus="focus"
      @blur="blur"
      @change="clearPlaceholder"
      class="na-select__input"
    >
      <option
        v-if="placeholder || labelPlaceholder"
        value=""
        class="na-select__input__placeholder"
      ></option>
      <slot></slot>
    </select>
    <span
      ref="heplerElement"
      v-if="state === 'success'"
      class="na-select__helper"
    >
      <i class="bx bxs-check-circle"></i>
      <slot name="helper-success"></slot>
    </span>
    <span
      ref="heplerElement"
      v-else-if="state === 'warning'"
      class="na-select__helper na-select__helper_warning"
    >
      <i class="bx bxs-info-circle"></i>
      <slot name="helper-warning"></slot>
    </span>
    <span
      ref="heplerElement"
      v-else-if="state === 'danger'"
      class="na-select__helper na-select__helper_danger"
    >
      <i class="bx bxs-x-circle"></i>
      <slot name="helper-danger"></slot>
    </span>
    <span ref="heplerElement" v-else class="na-select__helper">
      <slot name="helper-default"></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import NaSelectList from "./na-select-list.vue";

export default defineComponent({
  name: "NaSelect",
  emits: ["unfocus"],
  components: { NaSelectList },
  directives: {
    outside: {
      mounted(el: HTMLElement, binding) {
        el.addEventListener("click", (e) => e.stopPropagation());
        document.addEventListener("click", binding.value);
      },
      unmounted(el: HTMLElement, binding) {
        document.removeEventListener("click", binding.value);
      },
    },
  },
  props: {
    state: {
      type: String,
      default: "default",
    },
    inputValue: {
      type: String,
      default: null,
    },
    native: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Boolean,
      default: true,
    },
    multiselect: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    helper: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    labelPlaceholder: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: null,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const root = ref<HTMLElement>();
    const input = ref<HTMLInputElement>();
    const selectLabel = ref<HTMLElement>();
    const icon = ref<HTMLElement>();
    const selectList = ref<HTMLElement>();
    const heplerElement = ref<HTMLElement>();
    const styles = ref("");

    const displayLabel = props.labelPlaceholder
      ? ref(props.labelPlaceholder)
      : props.label
      ? ref(props.label)
      : null;

    const displayPlaceholder = props.labelPlaceholder
      ? ref("")
      : ref(props.placeholder);

    const display = ref("none");

    // eslint-disable-next-line no-unused-vars
    let focusButton = (ev: KeyboardEvent) => {};
    let currentButton = -1;

    onMounted(() => {
      setTimeout(() => {
        const helperHeight = heplerElement.value?.offsetHeight;
        styles.value += `--helper-height: ${helperHeight}px;`;

        const list: HTMLElement | null | undefined = root.value?.querySelector(
          ".na-select__list"
        );
        if (list) list.style.display = "none";
      });

      if (props.size) styles.value += `--max-size:${props.size};`;
      if (displayPlaceholder.value && props.native) {
        styles.value += `--placeholder:'${displayPlaceholder.value}';`;
      }

      const list: HTMLElement | null | undefined = root.value?.querySelector(
        ".na-select__list"
      );

      const width = list?.clientWidth;
      if (
        props.size &&
        list?.children.length &&
        list?.children.length > props.size
      ) {
        if (width) styles.value += `--padding-right: 0px;`;
      }

      if (width) styles.value += `width: ${width + 40}px;`;

      const buttons = list?.querySelectorAll("button");

      const buttonsArray = Array.prototype.slice.call(buttons);

      let firstButton = 0;
      let lastButton = buttonsArray.length - 1;

      focusButton = (ev: KeyboardEvent) => {
        if (currentButton === lastButton && ev.key === "Tab") {
          currentButton = -1;
          blur();
          return;
        }
        if (ev.key === "ArrowDown" || ev.key === "Tab") {
          ev.preventDefault();
          if (currentButton === lastButton) {
            currentButton = firstButton;
          } else {
            currentButton++;
          }
          buttonsArray[currentButton].focus();
        } else if (ev.key === "ArrowUp") {
          ev.preventDefault();
          if (currentButton === firstButton || currentButton === -1) {
            currentButton = lastButton;
          } else {
            currentButton--;
          }
          buttonsArray[currentButton].focus();
        } else {
          ev.stopPropagation();
          focus();
        }
      };
    });

    const classes = ref([
      {
        "na-select__label_placeholder": props.labelPlaceholder,
      },
    ]);

    const focus = (): void => {
      currentButton = -1;
      document.addEventListener("keydown", focusButton);

      const list: HTMLElement | null | undefined = root.value?.querySelector(
        ".na-select__list"
      );
      if (list) list.style.display = "block";

      setTimeout(() => {
        list?.classList.add("na-select__list_opened");
      });

      input.value?.focus();
      root.value?.classList.add("na-select_focused");

      if (!props.labelPlaceholder) return;

      selectLabel.value?.classList.remove("na-select__label_placeholder");
    };

    const blur = (): void => {
      document.removeEventListener("keydown", focusButton);

      const list: HTMLElement | null | undefined = root.value?.querySelector(
        ".na-select__list"
      );
      list?.classList.remove("na-select__list_opened");
      setTimeout(() => {
        if (list) list.style.display = "none";
      }, 100);

      icon.value?.classList.remove("focused");
      root.value?.classList.remove("na-select_focused");
      input.value?.blur();
      currentButton = -1;
      if (!props.labelPlaceholder || input.value?.value) return;

      selectLabel.value?.classList.add("na-select__label_placeholder");
    };

    const clearPlaceholder = (): void => {
      root.value?.style.setProperty("--placeholder", "");
    };

    return {
      displayLabel,
      classes,
      focus,
      blur,
      clearPlaceholder,
      input,
      selectLabel,
      root,
      icon,
      display,
      selectList,
      styles,
      heplerElement,
    };
  },
});
</script>