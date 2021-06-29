<template lang="pug">
include ../../mixins/na-input-mixin/inputTemplate

+input('selectClasses', ['bx', 'bxs-chevron-down'])
  template(v-if='native')
    template(v-if='filter')
      input.na-input__input(
        ref='inputRef',
        :placeholder='placeholder',
        :list='`_na-select-${uid}`',
        :value='modelValue',
        @focus='focus',
        @blur='blur'
      )
      datalist.na-select--filter__datalist(:id='`_na-select-${uid}`')
        slot
        template(v-if='options')
          na-option(
            v-for='(option, index) in options',
            :key='index',
            :value='option.value',
            :disabled='option.disabled'
          )
            | {{ option.title }}

    template(v-else)
      select.na-input__input(
        ref='inputRef',
        :value='modelValue',
        @focus='focus',
        @blur='blur'
      )
        option(disabled, v-if='placeholder')
          | {{ placeholder }}
        slot
        template(v-if='options')
          option(
            v-for='(option, index) in options',
            :key='index',
            :value='option.value',
            :disabled='option.disabled'
          )
            template(v-if='option.title')
              | {{ option.title }}

            template(v-else)
              | {{ option.value }}

  template(v-else)
    input.na-input__input(
      ref='inputRef',
      :value='inputValue',
      :class='{ "na-select__input--filter": filter }',
      :placeholder='placeholder',
      :readonly='!filter',
      @focus='focus'
    )
    transition(name='fade')
      .na-select__list(ref='selectList', v-show='focused')
        .na-select__container(ref='listContainer')
          slot
          template(v-if='options')
            na-option(
              v-for='(option, index) in options',
              :key='index',
              :value='option.value',
              :disabled='option.disabled'
            )
              template(#left-side)
                i(:class='option.leftIcon')
              template(#default, v-if='option.title')
                | {{ option.title }}
              template(#right-side)
                i(:class='option.rightIcon')

          transition(name='no-data-fade')
            .na-select__no-data(v-if='noData')
              i.bx.bxs-inbox
              span No data
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  provide,
  onMounted,
  nextTick,
  computed,
} from 'vue'

import { NaInput } from '../na-input'

import NaOption from './na-option.vue'
import { inputMixin, inputSetup } from '../../mixins/na-input-mixin'

import mitt, { Emitter } from 'mitt'
import {
  IOption,
  IRenderedOption,
  IRenderedOptionGroup,
  EmitterEvents,
} from './na-select'

let $_naSelectId = 0

export default defineComponent({
  name: 'NaSelect',
  mixins: [inputMixin],
  components: { NaOption },
  extends: NaInput,
  props: {
    native: {
      type: Boolean,
      default: false,
    },

    filter: {
      type: Boolean,
      default: false,
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
  setup: (props, { emit, slots }) => {
    const { leftSidePadding, rightSidePadding } = inputSetup(slots)

    const uid = ++$_naSelectId

    // Template refs
    const root = ref<HTMLElement>()
    const labelRef = ref<HTMLElement>()
    const inputRef = ref<HTMLInputElement | HTMLSelectElement>()
    const selectList = ref<HTMLElement>()
    const selectMessage = ref<HTMLElement>()

    // Data
    const inputValue = ref(props.modelValue)
    const focused = ref(false)
    const noData = ref(true)

    const selectClasses = computed(() => [
      'na-select',
      { 'na-select--native': props.native },
      { 'na-select--filter': props.filter },

      'na-input',
      `na-input--state-${props.state}`,
      { 'na-input--focused': focused.value },
    ])

    selectList.value?.style.setProperty('--max-size', String(props.size))
    selectList.value?.style.setProperty('--message-height', 0 + 'px')

    const emitter: Emitter<EmitterEvents> = mitt()

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
    provide('input', inputRef)
    provide('native', props.native)
    provide('filter', props.filter)

    nextTick(() => {
      emitter.on('add-rendered-option', (option) =>
        renderedOptions.push(option),
      )

      if (props.native) return

      emitter.on('add-option', (option) => {
        if (option) allOptions.push(option)
      })
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

      root.value?.style.setProperty(
        '--left-side-padding',
        leftSidePadding + 'px',
      )

      root.value?.style.setProperty(
        '--right-side-padding',
        rightSidePadding + 'px',
      )

      const messageHeight = selectMessage.value?.offsetHeight
      selectList.value?.style.setProperty(
        '--message-height',
        messageHeight + 'px',
      )

      reset()
    })

    // Methods
    const focus = (): void => {
      inputValue.value = ''
      reset()

      focused.value = true

      if (inputRef.value && !props.native) {
        inputRef.value.focus()

        document.addEventListener('keydown', focusOption)
        document.addEventListener('click', onClickOutside)
      }
    }

    const blur = (): void => {
      reset()
      setTimeout(() => (focused.value = false))

      if (inputRef.value && !props.native) {
        inputRef.value.blur()
        inputValue.value = selectedOptionTitle

        document.removeEventListener('keydown', focusOption)
        document.removeEventListener('click', onClickOutside)
      }
    }

    const onClickOutside = (e: Event): void => {
      if (e.target instanceof HTMLElement) {
        if (e.target.closest('.na-option')) blur()
        if (e.target.closest('.na-select') === root.value) return
      }

      blur()
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
          if (e.shiftKey) {
            if (currentOption === firstOption) focus()
            else prev(e)
          } else {
            if (currentOption === lastOption) blur()
            else next(e)
          }

          break

        case 'Shift':
          e.preventDefault()
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
          const hasDisplayed = group.element?.querySelector(
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

      leftSidePadding,
      rightSidePadding,
      // Template refs
      root,
      inputRef,
      labelRef,
      selectList,
      selectMessage,

      // Data
      inputValue,
      noData,
      focused,
      selectClasses,

      // Methods
      focus,
      blur,
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