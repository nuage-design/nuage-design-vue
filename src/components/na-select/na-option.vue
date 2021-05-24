<template>
  <transition name="fade">
    <button
      v-if="!native"
      v-show="show"
      ref="option"
      class="na-option"
      :value="value"
      :class="[
        { 'na-option_active': active },
        { 'na-option_disabled': disabled },
        { 'na-option_displayed': show }
      ]"
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
  </transition>

  <option v-if="native" :value="value">
    <slot>{{ value }}</slot>
  </option>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent, onUnmounted } from "vue";

export default defineComponent({
  name: "NaOption",
  emits: ["activate"],
  props: {
    active: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots, emit }) {
    const option = ref<HTMLButtonElement>();
    const native = ref(false);
    const show = ref(true);

    const hasRightSlot = () => slots["right-side"];

    const activate = () => {
      if (!props.disabled) emit("activate");
    };

    let filter = () => {};

    onMounted(() => {
      const parentElement = option.value?.parentElement;
      const input = parentElement?.parentElement?.previousSibling;

      if (props.disabled) {
        option.value?.addEventListener("click", ev => {
          ev.stopPropagation();
        });
      }

      filter = () => {
        if (input instanceof HTMLInputElement) {
          const optionValue = option.value?.innerText.toLowerCase();
          const inputValue = input.value.toLowerCase();

          show.value = optionValue?.indexOf(inputValue) !== -1;
        }
      };

      input?.addEventListener("input", filter);
      input?.addEventListener("focus", filter);

      native.value =
        parentElement?.tagName === "SELECT" ||
        parentElement?.tagName === "DATALIST";
    });

    onUnmounted(() => {
      const parentElement = option.value?.parentElement;
      const input = parentElement?.parentElement?.previousSibling;

      input?.removeEventListener("input", filter);
      input?.removeEventListener("focus", filter);
    });
    return { activate, option, hasRightSlot, native, show };
  }
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.1s ease-out;
  padding-top: 0;
  padding-bottom: 0;
  height: 0;
  overflow-y: hidden;
}

.fade-enter-from,
.fade-leave-to {
  transition: 0.2s ease-in;
  min-height: 0;
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
  opacity: 0;
  overflow-y: hidden;
}
</style>