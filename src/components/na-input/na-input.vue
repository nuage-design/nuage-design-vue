<template lang="pug">
include ../../mixins/na-input-mixin/inputTemplate

+input('classes')
  input.na-input__input(
    ref='input',
    @focus='focus',
    @blur='blur',
    @input='updateModelValue',
    :placeholder='placeholder'
  )
</template>

<script setup lang="ts">
import { computed, withDefaults, useSlots, onMounted, ref } from 'vue'

interface Props {
  modelValue?: string
  placeholder?: string
  label?: string
  state?: string
}

const props = withDefaults(defineProps<Props>(), {
  state: 'default',
})

const slots = useSlots()
const emit = defineEmits(['update:modelValue'])

const root = ref<HTMLDivElement>()

const focused = ref(false)

const leftSidePadding = slots['left-side'] ? 23 : 0
const rightSidePadding = slots['right-side'] ? 30 : 0

const focus = (): void => {
  focused.value = true
}

const blur = (): void => {
  focused.value = false
}

const input = ref<HTMLInputElement>()

onMounted(() => {
  input.value?.style.setProperty('--left-side-padding', leftSidePadding + 'px')
  input.value?.style.setProperty(
    '--right-side-padding',
    rightSidePadding + 'px',
  )
})

const updateModelValue = () => emit('update:modelValue', input?.value?.value)

const classes = computed(() => [
  'na-input',
  `na-input--state-${props.state}`,
  { 'na-input--focused': focused.value },
])
</script>
