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
    <input
      ref="input"
      @focus="placeholderToLabel"
      @blur="labelToPlaceholder"
      class="na-select__input"
      :placeholder="!labelPlaceholder ? placeholder : ''"
    />
    <slot></slot>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "NaSelect",
  props: {
    label: {
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
    const input = ref(null);
    const selectLabel = ref(null);
    const displayLabel = props.labelPlaceholder
      ? ref(props.labelPlaceholder)
      : props.label
      ? ref(props.label)
      : null;

    const classes = ref([
      { "na-select__label_placeholder": props.labelPlaceholder },
    ]);

    const placeholderToLabel = () => {
      if (!props.labelPlaceholder) return;

      selectLabel.value.classList.remove("na-select__label_placeholder");
    };

    const labelToPlaceholder = () => {
      if (!props.labelPlaceholder || input.value.value) return;

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
};
</script>