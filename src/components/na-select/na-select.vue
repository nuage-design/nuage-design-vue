<template>
  <div
    ref="select"
    :class="[
      'na-select',
      `na-select--state-${state}`,
      { 'na-select--native': native },
      { 'na-select--filter': filter },
      { 'na-select--focused': focused },
    ]"
  >
    <!-- label -->
    <label>
      <span v-if="label" ref="selectLabel" class="na-select__label">{{
        label
      }}</span>

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
          <datalist
            class="na-select--filter__datalist"
            :id="`_na-select-${uid}`"
          >
            <slot></slot>
            <template v-if="options">
              <na-option
                v-for="(option, index) in options"
                :key="index"
                :value="option.value"
                :disabled="option.disabled"
              >
                {{ option.title }}
              </na-option>
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
            <option disabled v-if="placeholder" value="">
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
          :class="{ 'na-select__input--filter': filter }"
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
            <div ref="listContainer" class="na-select__container">
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
                <div v-if="noData" class="na-select__no-data">
                  <i class="bx bxs-inbox"></i>
                  <span>No data</span>
                </div>
              </transition>
            </div>
          </div>
        </transition>
      </template>

      <!-- chevron -->
      <i class="bx bxs-chevron-down na-select__chevron"></i>

      <!-- message -->
      <div ref="selectMessage">
        <span v-if="state === 'success'" class="na-select__message">
          <i class="bx bxs-check-circle"></i>
          <slot name="message-success"></slot>
        </span>
        <span
          v-else-if="state === 'warning'"
          class="na-select__message na-select__message--warning"
        >
          <i class="bx bxs-info-circle"></i>
          <slot name="message-warning"></slot>
        </span>
        <span
          v-else-if="state === 'danger'"
          class="na-select__message na-select__message--danger"
        >
          <i class="bx bxs-x-circle"></i>
          <slot name="message-danger"></slot>
        </span>
        <span v-else class="na-select__message">
          <slot name="message-default"></slot>
        </span>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  provide,
  onMounted,
  nextTick,
} from 'vue'

import NaOption from './na-option.vue'

import mitt from 'mitt'
import { IOption, IRenderedOption, IRenderedOptionGroup } from '@/typings'

let $_naSelectId = 0

export default defineComponent({
  name: 'NaSelect',
  components: { NaOption },
  props: {
    modelValue: {
      type: String,
      default: null,
    },

    state: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['default', 'success', 'warning', 'danger'].includes(value)
      },
    },

    native: {
      type: Boolean,
      default: false,
    },

    filter: {
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

    size: {
      type: Number,
      default: null,
    },

    options: {
      type: Array as PropType<IOption[]>,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const uid = ++$_naSelectId

    // Template refs
    const select = ref<HTMLElement>()
    const selectLabel = ref<HTMLElement>()
    const selectInput = ref<HTMLInputElement | HTMLSelectElement>()
    const selectList = ref<HTMLElement>()
    const selectMessage = ref<HTMLElement>()

    // Data
    const inputValue = ref(props.modelValue)
    const focused = ref(false)
    const noData = ref(true)
    const listStyles = ref({
      '--max-size': props.size,
      '--message-height': 0 + 'px',
    })

    const emitter = mitt()

    const renderedOptions: IRenderedOption[] = []
    const renderedOptionGroups: IRenderedOptionGroup[] = []

    let allOptions: HTMLButtonElement[] = []
    let displayedOptions: HTMLButtonElement[] = []
    let availableOptions: HTMLButtonElement[] = []

    let selectedOptionTitle = ''
    let prevOption: IRenderedOption

    let firstOption = 0
    let lastOption = 0
    let currentOption = -1

    // Provides
    provide('emitter', emitter)
    provide('input', selectInput)
    provide('native', props.native)
    provide('filter', props.filter)

    nextTick(() => {
      emitter.on('add-rendered-option', (option) =>
        renderedOptions.push(option),
      )

      if (props.native) return

      emitter.on('add-option', (option) => allOptions.push(option))
      emitter.on('add-option-group', (group) =>
        renderedOptionGroups.push(group),
      )
      emitter.on('activate', (uid) => {
        const currentOption = renderedOptions.find(
          (option) => option.uid === uid,
        )!

        if (currentOption !== prevOption) {
          emit('update:modelValue', currentOption.value)

          if (prevOption) prevOption.selected.value = false
          currentOption.selected.value = true
          inputValue.value = currentOption.title
          selectedOptionTitle = currentOption.title
          prevOption = currentOption
        }
      })
    })

    // Hooks
    onMounted(() => {
      if (props.native) return

      const messageHeight = selectMessage.value?.offsetHeight
      listStyles.value['--message-height'] = messageHeight + 'px'

      reset()
    })

    // Methods
    const focus = (): void => {
      inputValue.value = ''
      reset()

      focused.value = true

      if (selectInput.value && !props.native) {
        selectInput.value.focus()

        document.addEventListener('keydown', focusOption)
        document.addEventListener('click', onClickOutside)
      }
    }

    const blur = (): void => {
      reset()
      setTimeout(() => (focused.value = false))

      if (selectInput.value && !props.native) {
        selectInput.value.blur()
        inputValue.value = selectedOptionTitle

        document.removeEventListener('keydown', focusOption)
        document.removeEventListener('click', onClickOutside)
      }
    }

    const onClickOutside = (e: Event): void => {
      if (e.target instanceof HTMLElement) {
        if (e.target.closest('.na-option')) blur()
        if (e.target.closest('.na-select') === select.value) return
      }

      blur()
    }

    const selectOption = (target: string): void => {
      const valid = renderedOptions.find((option) => option.value === target)

      if (valid) {
        emit('update:modelValue', target)
      } else if (selectInput.value) {
        emit('update:modelValue', '')
        selectInput.value.value = ''
      }
    }

    /** focus on the next option */
    const next = (e: KeyboardEvent): void => {
      e.preventDefault()
      if (!availableOptions.length) return

      currentOption =
        currentOption === lastOption ? firstOption : currentOption + 1

      availableOptions[currentOption].focus()
    }

    /** focus on the previous option */
    const prev = (e: KeyboardEvent): void => {
      e.preventDefault()
      if (!availableOptions.length) return

      currentOption =
        currentOption === firstOption || currentOption === -1
          ? lastOption
          : currentOption - 1

      availableOptions[currentOption].focus()
    }

    const focusOption = (e: KeyboardEvent): void => {
      switch (e.key) {
        case 'ArrowDown':
          next(e)
          break

        case 'ArrowUp':
          prev(e)
          break

        case 'Enter':
          if (currentOption !== -1) blur()
          break

        case 'Tab':
          if (currentOption === lastOption) blur()
          else next(e)
          break

        default:
          reset()
          e.stopPropagation()
          if (currentOption !== -1) focus()
          break
      }
    }

    const reset = (): void => {
      setTimeout(() => {
        displayedOptions = allOptions.filter((option) =>
          option.classList.contains('na-option--displayed'),
        )

        availableOptions = displayedOptions.filter(
          (option) => !option.classList.contains('na-option--disabled'),
        )

        renderedOptionGroups.map((group) => {
          const hasDisplayed = group.element.querySelector(
            '.na-option--displayed',
          )

          group.show.value = !!hasDisplayed
        })

        firstOption = 0
        lastOption = availableOptions.length - 1
        currentOption = -1

        noData.value = !displayedOptions.length
      })
    }

    return {
      uid,

      // Template refs
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
      selectOption,
    }
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.1s ease-out;
  top: calc(100% - var(--message-height) - 2px);
  overflow-y: hidden;
}

.fade-enter-from,
.fade-leave-to {
  transition: 0.1s ease-in;
  top: calc(100% - var(--message-height) - 7px);
  opacity: 0;
  overflow-y: hidden;
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
  transition: 0.2s ease-out;
  min-height: 0;
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
  opacity: 0;
  overflow-y: hidden;
}
</style>