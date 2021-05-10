<template>
  <div class="na-select">
    <label v-if="label">
      <span v-if="!labelPlaceholder" class="na-select__label">{{ label }}</span>
      <span v-else class="na-select__label-placeholder" :class="{ focused }">
        {{ labelPlaceholder }}
      </span>
      <select
        ref="input"
        class="na-select__input"
        @focus="focused = true"
        @blur="isSelected"
      >
        <na-option class="na-select__placeholder">
          <template v-if="!labelPlaceholder">
            {{ placeholder }}
          </template>
        </na-option>
        <slot></slot>
      </select>
    </label>
    <select v-else class="na-select__input">
      <na-option value="" class="na-select__placeholder">
        {{ placeholder }}
      </na-option>
      <slot></slot>
    </select>
  </div>
</template>

<script>
import { ref } from "vue";
import NaOption from "./na-option";

export default {
  name: "NaSelect",
  components: { NaOption },
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: "Select item",
    },
    labelPlaceholder: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const focused = ref(false);
    const input = ref(null);

    const isSelected = () => {
      if (input.value.value) focused.value = true;
      else focused.value = false;
    };

    return { props, focused, input, isSelected };
  },
};
</script>