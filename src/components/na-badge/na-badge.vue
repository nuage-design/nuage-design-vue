<template lang="pug">
div(ref="badge" :class="classes")
  span.na-badge__text(v-if="!dot")
    | {{ displayValue }}
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

interface Props {
  value?: string
  maxValue?: number
  inverse?: boolean
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxValue: 99,
})

let badge = $ref<HTMLDivElement>()

onMounted(() => {
  if (+props >= 0 && +props < 10) {
    badge.style.setProperty('--side-space', '0')
  }
})

let classes = $computed(() => [
  'na-badge',
  { 'na-badge--inverse': props.inverse },
  { 'na-badge--dot': props.dot || !props.value },
])

let displayValue = $computed(() => {
  if (props.value && props.maxValue && +props.value) {
    return +props.value > +props.maxValue ? props.maxValue + '+' : props.value
  }

  return props.value
})
</script>
