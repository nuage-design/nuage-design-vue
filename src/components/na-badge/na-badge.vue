<template>
  <div
    ref="badge"
    :class="[
      'na-badge',
      `na-badge--size-${size}`,
      { 'na-badge--inverse': inverse },
      { 'na-badge--dot': dot || !value },
    ]"
  >
    <span class="na-badge__text" v-if="!dot">{{ displayValue }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'

export default defineComponent({
  name: 'NaBadge',
  props: {
    size: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['small', 'default', 'large'].includes(value)
      },
    },
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

    const displayValue = computed(() => {
      if (props.maxValue && +props.value) {
        return +props.value > +props.maxValue
          ? props.maxValue + '+'
          : props.value
      }

      return props.value
    })

    return { displayValue, badge }
  },
})
</script>