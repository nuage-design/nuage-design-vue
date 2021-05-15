<template>
  <div
    ref="root"
    class="na-select"
    @click="focus"
    v-outside="blur"
    :style="styles"
  >
    <span
      v-if="displayLabel"
      @mousedown.prevent
      ref="selectLabel"
      class="na-select__label"
      :class="classes"
    >
      {{ displayLabel }}
    </span>
    <template v-if="filter && !native">
      <input
        ref="input"
        @blur="blur"
        @focus="focus"
        class="na-select__input"
        :placeholder="!labelPlaceholder ? placeholder : ''"
      />
      <na-select-list @mousedown.prevent :opened="opened">
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
    <i ref="icon" class="bx bxs-chevron-down"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import NaSelectList from "./na-select-list.vue";

export default defineComponent({
  name: "NaSelect",
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
  },
  setup(props) {
    const root = ref<HTMLElement>();
    const input = ref<HTMLInputElement>();
    const selectLabel = ref<HTMLElement>();
    const icon = ref<HTMLElement>();
    const selectList = ref<HTMLElement>();
    const styles = ref("");

    const displayLabel = props.labelPlaceholder
      ? ref(props.labelPlaceholder)
      : props.label
      ? ref(props.label)
      : null;

    const displayPlaceholder = props.labelPlaceholder
      ? ref("")
      : ref(props.placeholder);

    const opened = ref(false);
    const display = ref("none");

    // eslint-disable-next-line no-unused-vars
    let focusButton = (ev: KeyboardEvent) => {};

    onMounted(() => {
      if (displayPlaceholder.value && props.native)
        root.value?.style.setProperty(
          "--placeholder",
          `'${displayPlaceholder.value}'`
        );

      const list = root.value?.querySelector(".na-select__list");
      let firstButton = list?.firstElementChild;
      let lastButton = list?.lastElementChild;
      let currentButton = firstButton;
      currentButton?.classList.add("na-option_focused");

      const width = list?.clientWidth;
      if (width) styles.value += `width: ${width + 33}px;`;

      focusButton = (ev: KeyboardEvent) => {
        if (ev.key === "ArrowDown") {
          currentButton?.classList.remove("na-option_focused");
          if (currentButton === lastButton) {
            currentButton = firstButton;
          } else {
            currentButton = currentButton?.nextElementSibling;
          }
          currentButton?.classList.add("na-option_focused");
        } else if (ev.key === "ArrowUp") {
          currentButton?.classList.remove("na-option_focused");
          if (currentButton === firstButton) {
            currentButton = lastButton;
          } else {
            currentButton = currentButton?.previousElementSibling;
          }
          currentButton?.classList.add("na-option_focused");
        }
      };
    });

    const classes = ref([
      {
        "na-select__label_placeholder": props.labelPlaceholder,
      },
    ]);

    const focus = (): void => {
      document.addEventListener("keydown", focusButton);

      display.value = "block";
      setTimeout(() => {
        opened.value = true;
      });

      input.value?.focus();
      root.value?.classList.add("na-select_focused");

      if (!props.labelPlaceholder) return;

      selectLabel.value?.classList.remove("na-select__label_placeholder");
    };

    const blur = (): void => {
      document.removeEventListener("keydown", focusButton);

      display.value = "none";
      opened.value = false;
      icon.value?.classList.remove("focused");
      root.value?.classList.remove("na-select_focused");
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
      opened,
      display,
      selectList,
      styles,
    };
  },
});
</script>