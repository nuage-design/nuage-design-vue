<template lang="pug">
div(ref="root" :class="classes")
  label
    span.na-input__label(v-if="label" ref="labelRef")
      .
        {{
        label
        }}
    input.na-input__input(ref="input" @focus="focus" @blur="blur" @input="updateModelValue" :placeholder="placeholder")
    .na-input__internal-elements
      .na-input__left-side
        slot(name="left-side")
      .na-input__right-side
        slot(name="right-side")
    .na-input__message.na-input__message--state-success(v-if="state === 'success'")
      i.bx.bxs-check-circle
      slot(name="message-success")
    .na-input__message.na-input__message--state-warning(v-else-if="state === 'warning'")
      i.bx.bxs-info-circle
      slot(name="message-warning")
    .na-input__message.na-input__message--state-danger(v-else-if="state === 'danger'")
      i.bx.bxs-x-circle
      slot(name="message-danger")
    .na-input__message(v-else)
      slot(name="message-default")
</template>

<script setup lang="ts">
import { withDefaults, useSlots, onMounted } from 'vue'

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

let root = $ref<HTMLDivElement>()

let focused = $ref(false)

const leftSidePadding = slots['left-side'] ? 23 : 0
const rightSidePadding = slots['right-side'] ? 30 : 0

const focus = (): void => {
  focused = true
}

const blur = (): void => {
  focused = false
}

let input = $ref<HTMLInputElement>()

onMounted(() => {
  input.style.setProperty('--left-side-padding', leftSidePadding + 'px')
  input.style.setProperty('--right-side-padding', rightSidePadding + 'px')
})

const updateModelValue = () => emit('update:modelValue', input)

let classes = $computed(() => [
  'na-input',
  `na-input--state-${props.state}`,
  { 'na-input--focused': focused },
])
</script>
