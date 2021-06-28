<template lang="pug">
button(ref='button', :class='classes')
  slot
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'

export default defineComponent({
  name: 'NaButton',
  props: {
    size: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['small', 'default', 'large', 'xl'].includes(value)
      },
    },

    shape: {
      type: String,
      default: 'rounded',
      validator: (value: string) => {
        return ['rounded', 'rect', 'circle'].includes(value)
      },
    },

    type: {
      type: String,
      default: 'solid',
      validator: (value: string) => {
        return ['solid', 'border', 'transparent'].includes(value)
      },
    },

    active: {
      type: Boolean,
      default: false,
    },

    block: {
      type: Boolean,
      default: false,
    },

    equal: {
      type: Boolean,
      default: false,
    },

    space: {
      type: Number,
      default: 8,
    },
  },
  setup(props) {
    const button = ref<HTMLButtonElement>()

    const classes = computed(() => [
      'na-button',
      `na-button--size-${props.size}`,
      `na-button--shape-${props.shape}`,
      `na-button--style-${props.type}`,
      { 'na-button--active': props.active },
      { 'na-button--equal': props.equal },
      { 'na-button--block': props.block },
    ])

    onMounted(() => {
      button.value?.style.setProperty('--space', props.space + 'px')

      if (props.type === 'solid' || props.active) {
        const badges = button.value?.querySelectorAll('.na-badge')

        badges?.forEach((badge) => {
          badge.classList.add('na-badge_inverse')
        })
      }

      if (props.equal) {
        const firstItem = button.value?.firstElementChild

        if (firstItem instanceof HTMLElement) {
          let text = firstItem.innerText

          if (text) firstItem.innerText = text[0]

          if (firstItem.classList.contains('na-badge')) {
            firstItem.innerText = ''
            firstItem.classList.add('na-badge_dot')
          }

          if (button.value) {
            button.value.innerHTML = ''
            button.value.append(firstItem)
          }
        }
      }
    })

    return { button, classes }
  },
})
</script>