<template lang="pug">
.na-tooltip(:class='classes')
  .na-tooltip__content(ref='content')
    slot(name='default')
  .na-tooltip__tip(ref='tip')
    slot(name='tip')
</template>

<script setup lang="ts">
import { onMounted, useSlots, onBeforeUnmount, onBeforeMount } from 'vue'

interface Props {
  position?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
})

const slots = useSlots()

let tip = $ref<HTMLDivElement>()
let content = $ref<HTMLDivElement>()
let hidden = $ref(true)

let classes = $computed(() => [
  { 'na-tooltip--hidden': hidden },
  `na-tooltip--position-${props.position}`,
])

const show = () => (hidden = false)
const hide = () => (hidden = true)

onMounted(() => {
  const tipRect = tip.getBoundingClientRect()
  const contentRect = content.getBoundingClientRect()

  content.addEventListener('mouseover', show)
  content.addEventListener('mouseout', hide)

  tip.style.top = `-${tipRect.height + 10}px`
  tip.style.left = `${contentRect.width / 2 - tipRect.width / 2}px`
})

onBeforeUnmount(() => {
  content.removeEventListener('mouseover', show)
  content.removeEventListener('mouseout', hide)
})
</script>
