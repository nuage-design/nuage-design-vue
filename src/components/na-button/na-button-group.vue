<template lang="pug">
div(:class='classes')
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  vertical: boolean
  block: boolean
}>()

const classes = computed(() => [
  'na-button-group',
  { 'na-button-group--vertical': props.vertical },
  { 'na-button-group--block': props.block },
])
</script>
