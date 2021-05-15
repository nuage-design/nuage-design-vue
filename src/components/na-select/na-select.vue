<template>
  <div ref="root" class="na-select">
    <span
      @click="focus"
      ref="selectLabel"
      v-if="displayLabel"
      class="na-select__label"
      :class="classes"
    >
      {{ displayLabel }}
    </span>
    <template v-if="filter && !native">
      <input
        ref="input"
        @focus="focus"
        @blur="blur"
        class="na-select__input"
        :placeholder="!labelPlaceholder ? placeholder : ''"
      />
      <na-select-list :opened="opened" :style="`display: ${display}`">
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

    onMounted((): void => {
      if (displayPlaceholder.value && props.native)
        root.value?.style.setProperty(
          "--placeholder",
          `'${displayPlaceholder.value}'`
        );
    });

    const classes = ref([
      {
        "na-select__label_placeholder": props.labelPlaceholder,
      },
    ]);

    const focus = (): void => {
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
      setTimeout(() => {
        display.value = "none";
      }, 200);
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
    };
  },
});
</script>