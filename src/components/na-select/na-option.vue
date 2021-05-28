<template >
  <transition name="fade">
    <button
      v-if="!native"
      v-show="show"
      ref="option"
      class="na-option"
      :value="value"
      :class="[
        { 'na-option_selected': selected },
        { 'na-option_disabled': disabled },
        { 'na-option_displayed': show }
      ]"
      :style="styles"
      @keydown.enter="activate"
      @click="activate"
    >
      <span class="na-option__left-side">
        <slot name="left-side"></slot>
        <span ref="text" class="na-option__left-side__text"
          ><slot>{{ value }}</slot></span
        >
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
import { Emitter } from "mitt";
import {
  onMounted,
  ref,
  defineComponent,
  onUnmounted,
  inject,
  nextTick,
  getCurrentInstance
} from "vue";

export default defineComponent({
  name: "NaOption",
  props: {
    value: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const option = ref<HTMLButtonElement>();
    const native = ref(false);
    const show = ref(true);
    const selected = ref(false);
    const text = ref<HTMLElement>();

    const title = ref(props.value);

    const _uid = getCurrentInstance()?.uid;

    const emitter = inject<Emitter>("emitter")!;

    const hasRightSlot = () => slots["right-side"];

    const activate = () => {
      if (!props.disabled) {
        emitter.emit("activate", _uid);
      }
    };

    const styles = ref({
      "--padding-right": "38px"
    });

    let filter = () => {};

    nextTick(() => {
      emitter.emit("add-item", {
        id: _uid,
        title: title.value.trim(),
        value: props.value,
        selected: selected
      });
    });

    onMounted(() => {
      if (slots["default"]) title.value = text.value?.innerText!;
      if (slots["right-side"]) styles.value["--padding-right"] = "18px";

      const parentElement = option.value?.parentElement;
      const input = parentElement?.parentElement?.previousSibling;

      if (props.disabled) {
        option.value?.addEventListener("click", ev => {
          ev.stopPropagation();
        });
      }

      if (
        input instanceof HTMLInputElement &&
        input.classList.contains("na-select__input_filter")
      ) {
        filter = () => {
          const titleValue = title.value?.toLowerCase();
          const inputValue = input.value.toLowerCase();

          show.value = titleValue?.indexOf(inputValue) !== -1;
        };

        input?.addEventListener("input", filter);
        input?.addEventListener("focus", filter);
      }

      native.value =
        parentElement?.tagName === "SELECT" ||
        parentElement?.tagName === "DATALIST";
    });

    onUnmounted(() => {
      const parentElement = option.value?.parentElement;
      const input = parentElement?.parentElement?.previousSibling;

      if (
        input instanceof HTMLInputElement &&
        input.classList.contains("na-select__input_filter")
      ) {
        input?.removeEventListener("input", filter);
        input?.removeEventListener("focus", filter);
      }
    });
    return {
      activate,
      option,
      hasRightSlot,
      native,
      show,
      selected,
      title,
      text,
      styles
    };
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