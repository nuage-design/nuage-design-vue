<template>
  <div></div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  position: string
}>()

const visible = ref(false)

const mouseover = (e: MouseEvent): void => {
  visible.value = true
}

const mouseout = (e: MouseEvent): void => {
  visible.value = false
}

const classes = computed(() => [
  'na-tooltip',
  `na-tooltip--position-${props.position}`,
])
</script>

<style lang="scss"></style>
