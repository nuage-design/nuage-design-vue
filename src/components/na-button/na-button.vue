<template lang="pug">
button(ref="button" :class="classes")
  slot
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

interface Props {
  size?: string
  shape?: string
  type?: string
  active?: boolean
  block?: boolean
  equal?: boolean
  space?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  shape: 'rounded',
  type: 'solid',
  space: 8,
})

let button = $ref<HTMLButtonElement>()

let classes = $computed(() => [
  'na-button',
  `na-button--size-${props.size}`,
  `na-button--shape-${props.shape}`,
  `na-button--style-${props.type}`,
  { 'na-button--active': props.active },
  { 'na-button--equal': props.equal },
  { 'na-button--block': props.block },
])

onMounted(() => {
  button.style.setProperty('--space', props.space + 'px')

  if (props.type === 'solid' || props.active) {
    const badges = button.querySelectorAll('.na-badge')

    badges?.forEach(badge => {
      badge.classList.add('na-badge_inverse')
    })
  }

  if (props.equal) {
    const firstItem = button.firstElementChild

    if (firstItem instanceof HTMLElement) {
      let text = firstItem.innerText

      if (text) firstItem.innerText = text[0]

      if (firstItem.classList.contains('na-badge')) {
        firstItem.innerText = ''
        firstItem.classList.add('na-badge_dot')
      }

      if (button) {
        button.innerHTML = ''
        button.append(firstItem)
      }
    }
  }
})
</script>
