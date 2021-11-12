<template lang="pug">
label.na-switch(:class="classes")
  input(type="checkbox" :checked="checked" :disabled="disabled" :value="value")
  span.na-switch__label
    slot
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: string
  checked?: boolean
  disabled?: boolean
}>()

let classes = $computed(() => [{ 'na-switch--disabled': props.disabled }])
</script>
