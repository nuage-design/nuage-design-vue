<template lang="pug">
label.na-radio(:class='classes')
  input(type='radio', :checked='checked', :disabled='disabled', :value='value')
  span.na-radio__label
    slot
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'NaRadio',
  props: {
    value: {
      type: String,
      default: null,
    },
    checked: Boolean,
    disabled: Boolean,
  },
  setup(props) {
    const classes = computed(() => [{ 'na-radio--disabled': props.disabled }])

    return { classes }
  },
})
</script>
