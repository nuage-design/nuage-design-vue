<template lang="pug">
option(v-if='isNative', :value='value', :disabled='isDisabled')
  slot {{ value }}

transition(v-else, name='show')
  button.na-option(
    v-show='show',
    ref='option',
    :value='value',
    :class='classes',
    @keydown.enter='activate',
    @click='activate'
  )
    span.na-option__left-side
      slot(name='left-side')
      span.na-option__title(ref='optionTitle')
        slot {{ value }}

    span.na-option__right-side(v-if='$slots["right-side"]')
      slot(name='right-side')
</template>


<script lang="ts">
import {
  onMounted,
  ref,
  defineComponent,
  onUnmounted,
  inject,
  nextTick,
  Ref,
  computed,
} from 'vue'

import { Emitter } from 'mitt'
import type { EmitterEvents } from './na-select'

let $_naOptionId = 0

export default defineComponent({
  name: 'NaOption',
  props: {
    value: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const uid = ++$_naOptionId

    // Template refs
    const option = ref<HTMLButtonElement>()
    const optionTitle = ref<HTMLElement>()

    // Data
    const title = ref('')
    const show = ref(true)
    const selected = ref(false)

    // Injects
    const emitter = inject<Emitter<EmitterEvents>>('emitter')
    const input = inject<Ref<HTMLInputElement | HTMLSelectElement>>('input')
    const isNative = inject<Boolean>('native')
    const isFilter = inject<Boolean>('filter')
    const isDisabled = ref(false)

    const classes = computed(() => [
      { 'na-option--selected': selected.value },
      { 'na-option--disabled': isDisabled.value },
      { 'na-option--displayed': show.value },
    ])

    nextTick(() => {
      emitter?.emit('add-option', option.value)
      emitter?.emit('add-rendered-option', {
        uid,
        title: title.value ? title.value.trim() : props.value,
        value: props.value,
        selected,
      })
    })

    // Hooks
    onMounted(() => {
      if (isNative) return

      isDisabled.value = props.disabled
        ? true
        : option.value?.closest('.na-option-group')
        ? !!inject<Boolean>('disabled')
        : false

      title.value = slots['default']
        ? optionTitle.value?.innerText!
        : props.value

      option.value?.style.setProperty(
        '--padding-right',
        slots['right-side'] ? '18px' : '38px',
      )

      if (input?.value && isFilter) {
        input.value.addEventListener('input', filter)
        input.value.addEventListener('focus', filter)
      }
    })

    onUnmounted(() => {
      if (isNative) return

      if (input?.value && isFilter) {
        input.value.removeEventListener('input', filter)
        input.value.removeEventListener('focus', filter)
      }
    })

    // Methods
    const activate = (
      e: Event | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      if (!isDisabled.value) emitter?.emit('activate', uid)
      else e.stopPropagation()
    }

    const filter = () => {
      const titleValue = title.value?.toLowerCase()
      const inputValue = input!.value.value.toLowerCase()

      show.value = titleValue?.indexOf(inputValue) !== -1
    }

    return {
      // Template refs
      option,
      optionTitle,

      // Data
      classes,
      title,
      show,
      selected,
      isNative,
      isDisabled,

      // Methods
      activate,
    }
  },
})
</script>

<style scoped>
.show-enter-active,
.show-leave-active {
  transition: 0.2s ease-out;
  padding-top: 0;
  padding-bottom: 0;
  height: 0;
  overflow-y: hidden;
}

.show-enter-from,
.show-leave-to {
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