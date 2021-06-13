<template>
  <button
    ref="button"
    :class="[
      'na-button',
      `na-button--size-${size}`,
      `na-button--shape-${shape}`,
      `na-button--style-${type}`,
      { 'na-button--active': active },
      { 'na-button--equal': equal },
      { 'na-button--block': block },
    ]"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

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

    return { button }
  },
})
</script>