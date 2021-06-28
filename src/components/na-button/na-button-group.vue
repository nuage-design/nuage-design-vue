<template lang="pug">
div(:class='classes')
  slot
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'NaButtonGroup',
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const classes = computed(() => [
      'na-button-group',
      { 'na-button-group--vertical': props.vertical },
      { 'na-button-group--block': props.block },
    ])

    return { classes }
  },
})
</script>