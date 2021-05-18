<template>
  <button
    :value="value"
    ref="root"
    class="na-option"
    :class="{ 'na-option_active': active }"
    @keydown.enter="activate"
    @click="activate"
  >
    <span class="na-option__left-side">
      <slot name="left-side"></slot>
      <span>
        <slot>{{ value }}</slot>
      </span>
    </span>
    <span v-if="hasRightSlot()" class="na-option__right-side">
      <slot name="right-side"></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";

export default {
  name: "NaOption",
  emits: ["activate"],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: null,
    },
  },
  setup(props, { slots, emit }) {
    const root = ref<HTMLButtonElement>();

    onMounted(() => {});

    const hasRightSlot = () => slots["right-side"];

    const activate = () => {
      emit("activate");
      setTimeout(() => {
        document.body.click();
      }, 100);
    };
    return { activate, root, hasRightSlot };
  },
};
</script>