<template lang="pug">
label.na-checkbox(:class="classes")
  input(type="checkbox" :checked="checked" :disabled="disabled" :value="value")
  span.na-checkbox__label
    slot
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: string
  checked?: boolean
  disabled?: boolean
}>()

let classes = $computed(() => [{ 'na-checkbox--disabled': props.disabled }])
</script>
