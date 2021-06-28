<template lang="pug">
div(ref='root', :class='classes')
  label
    span.na-input__label(v-if='label', ref='label')
      | {{ label }}
    input.na-input__input(
      ref='input',
      @focus='focus',
      @blur='blur',
      @input='updateModelValue',
      :placeholder='placeholder'
    )
    .na-input__internal-elements
      .na-input__left-side
        slot(name='left-side')
      .na-input__right-side
        slot(name='right-side')
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

    const classes = computed(() => [
      'na-input',
      `na-input--state-${props.state}`,
      { 'na-input--focused': focused.value },
    ])

    return {
      focused,
      focus,
      blur,
      classes,
      input,
      updateModelValue,
    }
  },
})
</script>
