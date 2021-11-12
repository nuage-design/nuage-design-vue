<template lang="pug">
label.na-radio(:class="classes")
  input(type="radio" :checked="checked" :disabled="disabled" :value="value" :name="name")
  span.na-radio__label
    slot
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: string
  name?: string
  checked?: boolean
  disabled?: boolean
}>()

let classes = $computed(() => [{ 'na-radio--disabled': props.disabled }])
</script>
