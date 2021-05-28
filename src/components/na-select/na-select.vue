<template>
  <div
    ref="root"
    @click="focus"
    :class="[
      'na-select',
      `na-select_state_${state}`,
      { 'na-select_native': native },
      { 'na-select_filter': filter },
      { 'na-select_focused': focused }
    ]"
  >
    <!-- label -->
    <span v-if="label" ref="selectLabel" class="na-select__label">
      {{ label }}
    </span>

    <!-- chevron -->
    <i ref="icon" class="bx bxs-chevron-down na-select__input__chevron"></i>

    <template v-if="native">
      <template v-if="filter">
        <input
          ref="input"
          class="na-select__input"
          onchange="this.blur();"
          :placeholder="placeholder"
          :list="id"
          :value="modelValue"
          @change="changeSelect($event.target.value)"
          @focus="focus"
          @blur="blur"
        />
        <datalist :id="id">
          <slot></slot>
        </datalist>
      </template>
      <template v-else>
        <select
          ref="input"
          class="na-select__input"
          :value="modelValue"
          @change="$emit('update:modelValue', $event.target.value)"
          @focus="focus"
          @blur="blur"
        >
          <!-- placeholder -->
          <option
            v-if="placeholder"
            class="na-select__input__placeholder"
            value=""
            >{{ placeholder }}</option
          >
          <slot></slot>
        </select>
      </template>
    </template>

    <template v-else>
      <input
        ref="input"
        class="na-select__input"
        :value="inputValue"
        :class="{ 'na-select__input_filter': filter }"
        :placeholder="placeholder"
        :readonly="!filter"
        @focus="focus"
        @mousedown="clearInput"
      />
      <transition name="fade">
        <div
          ref="selectList"
          class="na-select__list"
          v-show="focused"
          :style="listStyles"
        >
          <div ref="listContainer" class="na-select__list__container">
            <slot></slot>
            <template v-if="options">
              <na-option
                v-for="(option, index) in options"
                :key="index"
                :value="option.value"
                :disabled="option.disabled"
              >
                <template v-slot:left-side>
                  <i :class="option.leftIcon" />
                </template>
                <template v-if="option.title" v-slot:default>
                  {{ option.title }}
                </template>
                <template v-slot:right-side>
                  <i :class="option.rightIcon" />
                </template>
              </na-option>
            </template>
            <transition name="no-data-fade">
              <div class="na-select__list__no-data" v-show="noData">
                <i class="bx bxs-inbox"></i>
                No data
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </template>

    <!-- message -->
    <div ref="message" @click.stop>
      <span v-if="state === 'success'" class="na-select__message">
        <i class="bx bxs-check-circle"></i>
        <slot name="message-success"></slot>
      </span>
      <span
        v-else-if="state === 'warning'"
        class="na-select__message na-select__message_warning"
      >
        <i class="bx bxs-info-circle"></i>
        <slot name="message-warning"></slot>
      </span>
      <span
        v-else-if="state === 'danger'"
        class="na-select__message na-select__message_danger"
      >
        <i class="bx bxs-x-circle"></i>
        <slot name="message-danger"></slot>
      </span>
      <span v-else class="na-select__message">
        <slot name="message-default"></slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  getCurrentInstance,
  provide,
  nextTick,
  Ref,
  PropType
} from "vue";

import NaOption from "./na-option.vue";

import mitt from "mitt";

interface Option {
  value: string;
  title: string;
  disabled: boolean;
  leftIcon: string;
  rightIcon: string;
}

export default defineComponent({
  name: "NaSelect",
  components: { NaOption },
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: "default"
    },
    native: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    size: {
      type: Number,
      default: null
    },
    options: {
      type: Array as PropType<Option[]>,
      default: null
    }
  },
  setup(props, { emit }) {
    const root = ref<HTMLElement>();
    const input = ref<HTMLInputElement | HTMLSelectElement>();
    const selectLabel = ref<HTMLElement>();
    const icon = ref<HTMLElement>();
    const selectList = ref<HTMLElement>();
    const message = ref<HTMLElement>();
    const focused = ref(false);

    const emitter = mitt();
    provide("emitter", emitter);

    const id = "_na-component-" + getCurrentInstance()?.uid;

    const inputValue = ref(props.modelValue);
    let selectedOptionTitle = "";

    const noData = ref(false);

    interface RenderedOption {
      id: number;
      title: string;
      value: string;
      selected: Ref;
    }

    let prevOption: RenderedOption;
    const options: RenderedOption[] = [];

    const listStyles = ref({
      "--max-size": props.size,
      "--message-height": 0 + "px"
    });

    let focusButton: any;
    let currentButton = -1;

    nextTick(() => {
      emitter.on("add-item", option => options.push(option));

      emitter.on("activate", id => {
        const currentOption = options.find(option => option.id === id)!;
        if (currentOption !== prevOption) {
          if (prevOption) prevOption.selected.value = false;
          currentOption.selected.value = true;
          inputValue.value = currentOption.title;
          selectedOptionTitle = currentOption.title;
          emit("update:modelValue", currentOption.value);
          prevOption = currentOption;
        }
        console.log(options);
      });
    });

    const changeSelect = (target: string) => {
      const valid = options.find(option => option.value === target);
      if (valid) emit("update:modelValue", target);
      else if (input.value) {
        input.value.value = "";
        emit("update:modelValue", "");
      }
    };

    onMounted(() => {
      const messageHeight = message.value?.offsetHeight;
      listStyles.value["--message-height"] = messageHeight + "px";

      if (!props.native) {
        let buttons = selectList.value?.querySelectorAll("button");
        let buttonsArray = Array.prototype.slice.call(buttons);

        noData.value = true;
        buttonsArray.forEach(button => {
          if (button.classList.contains("na-option_displayed")) {
            noData.value = false;
          }
        });

        input.value?.addEventListener("input", () => {
          noData.value = true;
          buttonsArray.forEach(button => {
            if (button.classList.contains("na-option_displayed")) {
              noData.value = false;
              return;
            }
          });
        });

        let firstButton = 0;
        let lastButton = buttonsArray.length - 1;

        const reset = () => {
          buttons = selectList.value?.querySelectorAll("button");
          if (buttons) buttonsArray = Array.prototype.slice.call(buttons);

          firstButton = 0;
          lastButton = buttonsArray?.length - 1;
        };

        focusButton = (ev: KeyboardEvent) => {
          const nextButton = () => {
            currentButton =
              currentButton === lastButton ? firstButton : currentButton + 1;

            const disabled = buttonsArray[currentButton].classList.contains(
              "na-option_disabled"
            );

            const displayed = buttonsArray[currentButton].classList.contains(
              "na-option_displayed"
            );
            if (disabled || !displayed) nextButton();
            buttonsArray[currentButton].focus();
          };

          const prevButton = () => {
            currentButton =
              currentButton === firstButton || currentButton === -1
                ? lastButton
                : currentButton - 1;

            let disabled = buttonsArray[currentButton].classList.contains(
              "na-option_disabled"
            );

            const displayed = buttonsArray[currentButton].classList.contains(
              "na-option_displayed"
            );
            if (disabled || !displayed) prevButton();
            buttonsArray[currentButton].focus();
          };

          if (currentButton === lastButton && ev.key === "Tab") {
            currentButton = -1;
            blur();
            return;
          }

          if (ev.key === "Enter" && currentButton !== -1) {
            currentButton = -1;
            blur();
            return;
          }

          if (ev.key === "ArrowDown" || ev.key === "Tab") {
            ev.preventDefault();
            nextButton();
            return;
          }

          if (ev.key === "ArrowUp") {
            ev.preventDefault();
            prevButton();
            return;
          }

          ev.stopPropagation();
          if (currentButton !== -1) focus();

          setTimeout(() => reset());
        };
      } else {
        if (!props.filter && !props.native)
          root.value?.style.setProperty(
            "--placeholder",
            `"${props.placeholder}"`
          );
      }
    });

    const clickOut = (e: Event): void => {
      if (e.target instanceof HTMLElement) {
        if (e.target.classList.contains("na-select__list__container")) return;
        if (e.target === root.value) return;

        if (root.value?.children) {
          for (let child of root.value.children) {
            if (child && e.target === child) return;
          }
        }
      }

      blur();
    };

    const focus = (): void => {
      focused.value = true;
      currentButton = -1;

      if (input.value && !props.native) {
        input.value.focus();

        document.addEventListener("keydown", focusButton);
        document.addEventListener("click", clickOut);
      }
    };

    const blur = (): void => {
      noData.value = false;
      setTimeout(() => (focused.value = false));
      currentButton = -1;

      if (input.value && !props.native) {
        input.value.blur();
        inputValue.value = selectedOptionTitle;

        document.removeEventListener("keydown", focusButton);
        document.removeEventListener("click", clickOut);
      }
    };

    const clearInput = (): void => {
      inputValue.value = "";
    };

    return {
      id,
      focus,
      blur,
      input,
      selectLabel,
      root,
      icon,
      selectList,
      focused,
      message,
      listStyles,
      noData,
      inputValue,
      changeSelect,
      clearInput
    };
  }
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.1s ease;
  top: calc(100% - var(--message-height) + 5px);
}

.fade-enter-from,
.fade-leave-to {
  top: calc(100% - var(--message-height) - 5px);
  opacity: 0;
}

.no-data-fade-enter-active,
.no-data-fade-leave-active {
  transition: 0.2s ease-in;
  padding-top: 0;
  padding-bottom: 0;
  height: 0;
  overflow-y: hidden;
}

.no-data-fade-enter-from,
.no-data-fade-leave-to {
  transition: 0.1s ease-out;
  min-height: 0;
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
  opacity: 0;
  overflow-y: hidden;
}
</style>