<template lang="pug">
div(ref='badge', :class='classes')
  span.na-badge__text(v-if='!dot')
    | {{ displayValue }}
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Props {
  value: [string, number]
  maxValue: number
  inverse: boolean
  dot: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxValue: 99,
})

const badge = ref<HTMLDivElement>()

onMounted(() => {
  if (+props.value >= 0 && +props.value < 10) {
    badge.value?.style.setProperty('--side-space', '0')
  }
})

const classes = computed(() => [
  'na-badge',
  { 'na-badge--inverse': props.inverse },
  { 'na-badge--dot': props.dot || !props.value },
])

const displayValue = computed(() => {
  if (props.maxValue && +props.value) {
    return +props.value > +props.maxValue ? props.maxValue + '+' : props.value
  }

  return props.value
})
</script>
