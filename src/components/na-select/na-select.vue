<template>
  <div class="na-select">
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
    <select v-else class="na-select__input">
      <slot native></slot>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

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
    const input = ref<HTMLInputElement>();
    const selectLabel = ref<HTMLElement>();
    const displayLabel = props.labelPlaceholder
      ? ref(props.labelPlaceholder)
      : props.label
      ? ref(props.label)
      : null;

    const classes = ref([
      { "na-select__label_placeholder": props.labelPlaceholder },
    ]);

    const placeholderToLabel = () => {
      if (!selectLabel.value || !props.labelPlaceholder) return;

      selectLabel.value.classList.remove("na-select__label_placeholder");
    };

    const labelToPlaceholder = () => {
      if (
        !selectLabel.value ||
        !input.value ||
        !props.labelPlaceholder ||
        input.value.value
      )
        return;

      selectLabel.value.classList.add("na-select__label_placeholder");
    };

    return {
      displayLabel,
      classes,
      placeholderToLabel,
      labelToPlaceholder,
      input,
      selectLabel,
    };
  },
});
</script>