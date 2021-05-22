<template>
  <div
    ref="root"
    class="na-select"
    @click="focus"
    :class="`na-select_state_${state}`"
  >
    <span
      v-if="displayLabel"
      ref="selectLabel"
      class="na-select__label"
      :class="{ 'na-select__label_placeholder': labelPlaceholder }"
    >
      {{ displayLabel }}
    </span>
    <div class="na-select__input__chevron">
      <i ref="icon" class="bx bxs-chevron-down"></i>
    </div>

    <template v-if="!native">
      <input
        :value="value"
        ref="input"
        @focus="focus"
        class="na-select__input"
        :placeholder="!labelPlaceholder ? placeholder : ''"
      />
      <transition name="slide-fade">
        <div ref="selectList" class="na-select__list__container">
          <na-select-list
            v-show="focused"
            :style="`--max-size:${size};--padding-right:${paddingRight}px`"
          >
            <slot></slot>
          </na-select-list>
        </div>
      </transition>
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
    <div @click.stop>
      <span v-if="state === 'success'" class="na-select__helper">
        <i class="bx bxs-check-circle"></i>
        <slot name="helper-success"></slot>
      </span>
      <span
        v-else-if="state === 'warning'"
        class="na-select__helper na-select__helper_warning"
      >
        <i class="bx bxs-info-circle"></i>
        <slot name="helper-warning"></slot>
      </span>
      <span
        v-else-if="state === 'danger'"
        class="na-select__helper na-select__helper_danger"
      >
        <i class="bx bxs-x-circle"></i>
        <slot name="helper-danger"></slot>
      </span>
      <span v-else class="na-select__helper">
        <slot name="helper-default"></slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import NaSelectList from "./na-select-list.vue";

export default defineComponent({
  name: "NaSelect",
  emits: ["unfocus"],
  components: { NaSelectList },
  props: {
    state: {
      type: String,
      default: "default",
    },
    value: {
      type: String,
      default: null,
    },
    native: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Boolean,
      default: false,
    },
    multiselect: {
      type: Boolean,
      default: false,
    },
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
    size: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const root = ref<HTMLElement>();
    const input = ref<HTMLInputElement>();
    const selectLabel = ref<HTMLElement>();
    const icon = ref<HTMLElement>();
    const selectList = ref<HTMLElement>();
    const focused = ref(false);
    const paddingRight = ref(10);

    const displayLabel = props.labelPlaceholder
      ? ref(props.labelPlaceholder)
      : props.label
      ? ref(props.label)
      : null;

    // eslint-disable-next-line no-unused-vars
    let focusButton = (ev: KeyboardEvent) => {};
    let currentButton = -1;

    onMounted(() => {
      const buttons = selectList.value?.querySelectorAll("button");
      console.log(buttons);
      const buttonsArray = Array.prototype.slice.call(buttons);

      if (props.size >= buttonsArray.length || !props.size) {
        paddingRight.value = 10;
      } else {
        paddingRight.value = 5;
      }

      let firstButton = 0;
      let lastButton = buttonsArray.length - 1;

      focusButton = (ev: KeyboardEvent) => {
        if (currentButton === lastButton && ev.key === "Tab") {
          currentButton = -1;
          blur();
          return;
        }
        if (ev.key === "ArrowDown" || ev.key === "Tab") {
          ev.preventDefault();
          if (currentButton === lastButton) {
            currentButton = firstButton;
          } else {
            currentButton++;
          }
          buttonsArray[currentButton].focus();
        } else if (ev.key === "ArrowUp") {
          ev.preventDefault();
          if (currentButton === firstButton || currentButton === -1) {
            currentButton = lastButton;
          } else {
            currentButton--;
          }
          buttonsArray[currentButton].focus();
        } else {
          ev.stopPropagation();
          focus();
        }
      };
    });

    const clickOut = (e: Event) => {
      if (e.target === root.value) return;

      if (root.value?.children) {
        for (let child of root.value.children) {
          if (child && e.target === child) return;
        }
      }

      blur();
    };

    const focus = (): void => {
      focused.value = true;

      document.addEventListener("click", clickOut);

      currentButton = -1;
      document.addEventListener("keydown", focusButton);

      input.value?.focus();
      root.value?.classList.add("na-select_focused");

      if (!props.labelPlaceholder) return;

      selectLabel.value?.classList.remove("na-select__label_placeholder");
    };

    const blur = (): void => {
      focused.value = false;

      document.removeEventListener("keydown", focusButton);
      document.removeEventListener("click", clickOut);

      root.value?.classList.remove("na-select_focused");

      input.value?.blur();
      currentButton = -1;

      if (!props.labelPlaceholder || input.value?.value) return;

      selectLabel.value?.classList.add("na-select__label_placeholder");
    };

    const clearPlaceholder = (): void => {
      root.value?.style.setProperty("--placeholder", "");
    };

    return {
      displayLabel,
      focus,
      blur,
      clearPlaceholder,
      input,
      selectLabel,
      root,
      icon,
      selectList,
      focused,
      paddingRight,
    };
  },
});
</script>

<style lang="scss">
.na-select__list__container {
  position: relative;
  top: 8px;
  height: 0;

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>