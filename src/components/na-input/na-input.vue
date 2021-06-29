<template lang="pug">
include ../../mixins/na-input-mixin/inputTemplate

+input('inputClasses')
  input.na-input__input(
    ref='input',
    @focus='focus',
    @blur='blur',
    @input='updateModelValue',
    :placeholder='placeholder'
  )
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { inputMixin, inputSetup } from '../../mixins/na-input-mixin'

export default defineComponent({
  name: 'NaInput',
  emits: ['update:modelValue'],
  mixins: [inputMixin],
  setup: (props, { slots, emit }) => {
    const {
      leftSidePadding,
      rightSidePadding,
      focused,
      focus,
      blur,
    } = inputSetup(slots)

    const input = ref<HTMLInputElement>()

    onMounted(() => {
      input.value?.style.setProperty(
        '--left-side-padding',
        leftSidePadding + 'px',
      )
      input.value?.style.setProperty(
        '--right-side-padding',
        rightSidePadding + 'px',
      )
    })

    const updateModelValue = () =>
      emit('update:modelValue', input?.value?.value)

    const inputClasses = computed(() => [
      'na-input',
      `na-input--state-${props.state}`,
      { 'na-input--focused': focused.value },
    ])

    return {
      focused,
      focus,
      blur,
      inputClasses,
      input,
      updateModelValue,
    }
  },
})
</script>
