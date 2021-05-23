<template>
  <button
    v-if="!native"
    ref="root"
    class="na-option"
    :value="value"
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
  <option v-else :value="value">
    <slot>{{ value }}</slot>
  </option>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";

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
    const native = ref(false);

    const hasRightSlot = () => slots["right-side"];

    const activate = () => {
      emit("activate");
    };

    onMounted(() => {
      native.value =
        root.value?.parentElement?.tagName === "SELECT" ||
        root.value?.parentElement?.tagName === "DATALIST";
    });
    return { activate, root, hasRightSlot, native };
  },
};
</script>