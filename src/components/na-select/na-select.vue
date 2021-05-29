<template>
  <div
    ref="select"
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
    <i class="bx bxs-chevron-down na-select__input__chevron"></i>

    <!-- native select -->
    <template v-if="native">
      <!-- filter -->
      <template v-if="filter">
        <input
          ref="selectInput"
          class="na-select__input"
          onchange="this.blur();"
          :placeholder="placeholder"
          :list="`_na-select-${uid}`"
          :value="modelValue"
          @change="selectOption($event.target.value)"
          @focus="focus"
          @blur="blur"
        />
        <datalist :id="`na-select_filter__datalist-${uid}`">
          <slot></slot>
          <template v-if="options">
            <option
              v-for="(option, index) in options"
              :key="index"
              :value="option.value"
              :disabled="option.disabled"
            >
              <template v-if="option.title">
                {{ option.title }}
              </template>
              <template v-else>
                {{ option.value }}
              </template>
            </option>
          </template>
        </datalist>
      </template>

      <!-- no filter -->
      <template v-else>
        <select
          ref="selectInput"
          class="na-select__input"
          :value="modelValue"
          @change="$emit('update:modelValue', $event.target.value)"
          @focus="focus"
          @blur="blur"
        >
          <!-- placeholder -->
          <option v-if="placeholder" value="">
            {{ placeholder }}
          </option>

          <slot></slot>

          <template v-if="options">
            <option
              v-for="(option, index) in options"
              :key="index"
              :value="option.value"
              :disabled="option.disabled"
            >
              <template v-if="option.title">
                {{ option.title }}
              </template>
              <template v-else>
                {{ option.value }}
              </template>
            </option>
          </template>
        </select>
      </template>
    </template>

    <!-- custom select -->
    <template v-else>
      <input
        ref="selectInput"
        class="na-select__input"
        :value="inputValue"
        :class="{ 'na-select__input_filter': filter }"
        :placeholder="placeholder"
        :readonly="!filter"
        @focus="focus"
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
                <template #left-side>
                  <i :class="option.leftIcon" />
                </template>
                <template #default v-if="option.title">
                  {{ option.title }}
                </template>
                <template #right-side>
                  <i :class="option.rightIcon" />
                </template>
              </na-option>
            </template>
            <transition name="no-data-fade">
              <div v-show="noData" class="na-select__list__no-data">
                <i class="bx bxs-inbox"></i>
                <span>No data</span>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </template>

    <!-- message -->
    <div ref="selectMessage" @click.stop>
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
import { Ref, defineComponent, PropType, ref, provide, onMounted } from "vue";

import NaOption from "./na-option.vue";

import mitt from "mitt";

interface Option {
  value: string;
  title: string;
  disabled: boolean;
  leftIcon: string;
  rightIcon: string;
}

interface RenderedOption {
  uid: number;
  title: string;
  value: string;
  selected: Ref;
}

let $_naSelectId = 0;

export default defineComponent({
  name: "NaSelect",
  components: { NaOption },
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
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const uid = ++$_naSelectId;

    // DOM refs
    const select = ref<HTMLElement>();
    const selectLabel = ref<HTMLElement>();
    const selectInput = ref<HTMLInputElement | HTMLSelectElement>();
    const selectList = ref<HTMLElement>();
    const selectMessage = ref<HTMLElement>();

    // Data
    const inputValue = ref(props.modelValue);
    const focused = ref(false);
    const noData = ref(true);
    const listStyles = ref({
      "--max-size": props.size,
      "--message-height": 0 + "px"
    });

    const renderedOptions: RenderedOption[] = [];
    const emitter = mitt();

    let allOptions: HTMLButtonElement[] = [];
    let displayedOptions: HTMLButtonElement[] = [];

    let selectedOptionTitle = "";
    let prevOption: RenderedOption;

    let firstOption = 0;
    let lastOption = 0;
    let currentOption = -1;

    // Provides
    provide("emitter", emitter);
    provide("input", selectInput);
    provide("native", props.native);
    provide("filter", props.filter);

    // Hooks
    onMounted(() => {
      if (props.native) return;

      const messageHeight = selectMessage.value?.offsetHeight;
      listStyles.value["--message-height"] = messageHeight + "px";

      emitter.on("add-option", option => allOptions.push(option));
      emitter.on("add-rendered-option", option => renderedOptions.push(option));
      emitter.on("activate", uid => {
        const currentOption = renderedOptions.find(
          option => option.uid === uid
        )!;

        if (currentOption !== prevOption) {
          emit("update:modelValue", currentOption.value);

          if (prevOption) prevOption.selected.value = false;
          currentOption.selected.value = true;
          inputValue.value = currentOption.title;
          selectedOptionTitle = currentOption.title;
          prevOption = currentOption;
        }
      });

      reset();
    });

    // Methods
    const focus = (): void => {
      clearInput();
      reset();

      focused.value = true;

      if (selectInput.value && !props.native) {
        selectInput.value.focus();

        document.addEventListener("keydown", focusOption);
        document.addEventListener("click", clickOut);
      }
    };

    const blur = (): void => {
      reset();
      setTimeout(() => (focused.value = false));
      currentOption = -1;

      if (selectInput.value && !props.native) {
        selectInput.value.blur();
        inputValue.value = selectedOptionTitle;

        document.removeEventListener("keydown", focusOption);
        document.removeEventListener("click", clickOut);
      }
    };

    const clearInput = (): void => {
      inputValue.value = "";
    };

    const clickOut = (e: Event): void => {
      if (e.target instanceof HTMLElement) {
        if (e.target.classList.contains("na-select__list__container")) return;
        if (e.target === select.value) return;

        if (select.value?.children) {
          for (let child of select.value.children) {
            if (child && e.target === child) return;
          }
        }
      }

      blur();
    };

    const selectOption = (target: string): void => {
      const valid = renderedOptions.find(option => option.value === target);

      if (valid) {
        emit("update:modelValue", target);
      } else if (selectInput.value) {
        emit("update:modelValue", "");
        selectInput.value.value = "";
      }
    };

    // focus on the next option
    const next = (e: KeyboardEvent): void => {
      e.preventDefault();
      if (!displayedOptions.length) return;

      currentOption =
        currentOption === lastOption ? firstOption : currentOption + 1;

      displayedOptions[currentOption].focus();
    };

    // focus on the previous option
    const prev = (e: KeyboardEvent): void => {
      e.preventDefault();
      if (!displayedOptions.length) return;

      currentOption =
        currentOption === firstOption || currentOption === -1
          ? lastOption
          : currentOption - 1;

      displayedOptions[currentOption].focus();
    };

    const focusOption = (e: KeyboardEvent): void => {
      switch (e.key) {
        case "ArrowDown":
          next(e);
          break;

        case "ArrowUp":
          prev(e);
          break;

        case "Enter":
          if (currentOption !== -1) blur();
          break;

        case "Tab":
          if (currentOption === lastOption) blur();
          else next(e);
          break;

        default:
          reset();
          e.stopPropagation();
          if (currentOption !== -1) focus();
          break;
      }
    };

    const reset = (): void => {
      setTimeout(() => {
        displayedOptions = allOptions.filter(
          option =>
            option.classList.contains("na-option_displayed") &&
            !option.classList.contains("na-option_disabled")
        );

        firstOption = 0;
        lastOption = displayedOptions.length - 1;
        currentOption = -1;

        noData.value = !displayedOptions.length;
      });
    };

    return {
      uid,

      // DOM refs
      select,
      selectInput,
      selectLabel,
      selectList,
      selectMessage,

      // Data
      inputValue,
      noData,
      focused,
      listStyles,

      // Methods
      focus,
      blur,
      clearInput,
      selectOption
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