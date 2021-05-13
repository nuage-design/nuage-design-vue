<template>
  <div ref="root" class="na-select">
    <span
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
        @focus="placeholderToLabel"
        @blur="labelToPlaceholder"
        class="na-select__input"
        :placeholder="!labelPlaceholder ? placeholder : ''"
      />
      <slot></slot>
    </template>
    <select
      v-else
      ref="input"
      @focus="placeholderToLabel"
      @blur="labelToPlaceholder"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "NaSelect",
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
    const displayLabel = props.labelPlaceholder
      ? ref(props.labelPlaceholder)
      : props.label
      ? ref(props.label)
      : null;
    const displayPlaceholder = props.labelPlaceholder
      ? ref("")
      : ref(props.placeholder);

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

    const placeholderToLabel = (): void => {
      if (!props.labelPlaceholder) return;

      selectLabel.value?.classList.remove("na-select__label_placeholder");
    };

    const labelToPlaceholder = (): void => {
      if (!props.labelPlaceholder || input.value?.value) return;

      selectLabel.value?.classList.add("na-select__label_placeholder");
    };

    const clearPlaceholder = (): void => {
      root.value?.style.setProperty("--placeholder", "");
    };

    return {
      displayLabel,
      classes,
      placeholderToLabel,
      labelToPlaceholder,
      clearPlaceholder,
      input,
      selectLabel,
      root,
    };
  },
});
</script>