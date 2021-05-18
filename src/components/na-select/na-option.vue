<template>
  <button
    :value="value"
    ref="root"
    class="na-option"
    :class="{ 'na-option_active': active }"
    @keydown.enter="activate"
    @click="activate"
    :active="mutableActive"
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
  emits: ["logActivate"],
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
    const mutableActive = ref(false);

    onMounted(() => {});

    const hasRightSlot = () => slots["right-side"];

    const activate = () => {
      emit("logActivate");

      // const list = root.value?.parentNode?.children;

      // for (let i of list) {
      //   i.setAttribute("active", false);
      // }

      mutableActive.value = true;
    };
    return { activate, root, hasRightSlot, mutableActive };
  },
};
</script>