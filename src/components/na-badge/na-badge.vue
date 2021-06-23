<template lang="pug">
div(ref='badge', :class='classes')
  span.na-badge__text(v-if='!dot')
    | {{ displayValue }}
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'

export default defineComponent({
  name: 'NaBadge',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    maxValue: {
      type: Number,
      default: 99,
    },
    inverse: {
      type: Boolean,
      default: false,
    },
    dot: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const badge = ref<HTMLDivElement>()

    onMounted(() => {
      if (+props.value) {
        if (props.value >= 0 && props.value < 10) {
          badge.value?.style.setProperty('--side-space', '0')
        }
      }
    })

    const classes = computed(() => [
      'na-badge',
      { 'na-badge--inverse': props.inverse },
      { 'na-badge--dot': props.dot || !props.value },
    ])

    const displayValue = computed(() => {
      if (props.maxValue && +props.value) {
        return +props.value > +props.maxValue
          ? props.maxValue + '+'
          : props.value
      }

      return props.value
    })

    return { displayValue, badge, classes }
  },
})
</script>