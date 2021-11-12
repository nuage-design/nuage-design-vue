<template lang="pug">
div(:class="classes")
  slot
</template>

<script setup lang="ts">
const props = defineProps<{
  vertical?: boolean
  block?: boolean
}>()

let classes = $computed(() => [
  'na-button-group',
  { 'na-button-group--vertical': props.vertical },
  { 'na-button-group--block': props.block },
])
</script>
