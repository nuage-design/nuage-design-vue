<template>
  <div ref="root" @click="focus" :class="classes">
    <!-- label -->
    <span
      v-if="displayLabel"
      ref="selectLabel"
      class="na-select__label"
      :class="{ 'na-select__label_placeholder': labelPlaceholder }"
    >
      {{ displayLabel }}
    </span>

    <!-- chevron -->
    <i ref="icon" class="bx bxs-chevron-down na-select__input__chevron"></i>

    <template v-if="native">
      <template v-if="filter">
        <input
          ref="input"
          class="na-select__input"
          :value="value"
          :placeholder="!labelPlaceholder ? placeholder : ''"
          :list="id"
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
          @focus="focus"
          @blur="blur"
          @change="setPlaceholder"
        >
          <!-- placeholder -->
          <option
            v-if="placeholder || labelPlaceholder"
            class="na-select__input__placeholder"
            value=""
          ></option>
          <slot></slot>
        </select>
      </template>
    </template>

    <template v-else>
      <input
        ref="input"
        class="na-select__input"
        :value="value"
        :placeholder="!labelPlaceholder ? placeholder : ''"
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
import { defineComponent, onMounted, ref, getCurrentInstance } from "vue";

export default defineComponent({
  name: "NaSelect",
  emits: ["unfocus"],
  props: {
    state: {
      type: String,
      default: "default"
    },
    value: {
      type: String,
      default: null
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
    labelPlaceholder: {
      type: String,
      default: null
    },
    size: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const root = ref<HTMLElement>();
    const input = ref<HTMLInputElement>();
    const selectLabel = ref<HTMLElement>();
    const icon = ref<HTMLElement>();
    const selectList = ref<HTMLElement>();
    const message = ref<HTMLElement>();
    const focused = ref(false);

    const id = "_na-component-" + getCurrentInstance()?.uid;

    const classes = [
      "na-select",
      `na-select_state_${props.state}`,
      { "na-select_native": props.native },
      { "na-select_filter": props.filter }
    ];

    const listStyles = ref({
      "--max-size": props.size,
      "--message-height": 0 + "px"
    });

    const displayLabel = props.labelPlaceholder
      ? ref(props.labelPlaceholder)
      : props.label
      ? ref(props.label)
      : null;

    // eslint-disable-next-line no-unused-vars
    let focusButton = (ev: KeyboardEvent) => {};
    let currentButton = -1;

    onMounted(() => {
      const messageHeight = message.value?.offsetHeight;
      listStyles.value["--message-height"] = messageHeight + "px";

      if (!props.native) {
        let buttons = selectList.value?.querySelectorAll("button");
        let buttonsArray = Array.prototype.slice.call(buttons);

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
          focus();

          setTimeout(() => reset());
        };
      } else {
        if (!props.labelPlaceholder && !props.filter)
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

      input.value?.focus();

      document.addEventListener("keydown", focusButton);
      document.addEventListener("click", clickOut);

      root.value?.classList.add("na-select_focused");

      if (!props.labelPlaceholder) return;

      selectLabel.value?.classList.remove("na-select__label_placeholder");
    };

    const blur = (): void => {
      focused.value = false;
      currentButton = -1;

      input.value?.blur();

      document.removeEventListener("keydown", focusButton);
      document.removeEventListener("click", clickOut);

      root.value?.classList.remove("na-select_focused");

      if (!props.labelPlaceholder || input.value?.value) return;

      selectLabel.value?.classList.add("na-select__label_placeholder");
    };

    const setPlaceholder = (): void => {
      if (input.value?.value) {
        root.value?.style.setProperty("--placeholder", "");
      } else if (!props.labelPlaceholder) {
        root.value?.style.setProperty(
          "--placeholder",
          `"${props.placeholder}"`
        );
      }
    };

    return {
      id,
      classes,
      displayLabel,
      focus,
      blur,
      setPlaceholder,
      input,
      selectLabel,
      root,
      icon,
      selectList,
      focused,
      message,
      listStyles
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
</style>