<template>
  <button
    ref="button"
    :class="[
      'na-button',
      `na-button_size_${size}`,
      `na-button_type_${type}`,
      `na-button_style_${buttonStyle}`,
      `na-button_color_${color}`,
      { 'na-button_light-text': lightText },
      { 'na-button_active': active },
      { 'na-button_equal': equal },
      { 'na-button_block': block },
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

    type: {
      type: String,
      default: 'rounded',
      validator: (value: string) => {
        return ['rounded', 'rect', 'circle'].includes(value)
      },
    },

    buttonStyle: {
      type: String,
      default: 'solid',
      validator: (value: string) => {
        return ['solid', 'border', 'transparent'].includes(value)
      },
    },

    color: {
      type: String,
      default: 'primary',
    },

    lightText: {
      type: Boolean,
      default: false,
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

      if (props.buttonStyle === 'solid' || props.active) {
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