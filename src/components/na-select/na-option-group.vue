<template lang="pug">
optgroup(v-if='isNative && !isFilter', :label='label', :disabled='disabled')
  slot

div(
  v-else-if='label',
  ref='optionGroup',
  :disabled='disabled',
  :class='classes'
)
  transition(name='show')
    .na-option-group__label(v-show='show', ref='label')
      | {{ label }}

  slot

slot(v-else)
</template>

<script lang="ts">
import { defineComponent, provide, inject, nextTick, ref, computed } from 'vue'

import { Emitter } from 'mitt'
import type { EmitterEvents } from './na-select'

export default defineComponent({
  name: 'NaOptionGroup',
  props: {
    label: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // Template refs
    const optionGroup = ref<HTMLDivElement>()

    // Provides
    provide('disabled', props.disabled)

    // Injects
    const emitter = inject<Emitter<EmitterEvents>>('emitter')
    const isNative = inject<Boolean>('native')
    const isFilter = inject<Boolean>('filter')

    const classes = computed(() => [
      'na-option-group',
      { 'na-option-group--disabled': props.disabled },
    ])

    // Data
    const show = ref(true)

    nextTick(() => {
      emitter?.emit('add-option-group', {
        element: optionGroup.value,
        show,
      })
    })

    return { optionGroup, isNative, isFilter, show, classes }
  },
})
</script>

<style scoped>
.show-enter-active,
.show-leave-active {
  transition: 0.1s ease-out;
  padding-bottom: 8px;
  height: 0;
  overflow-y: hidden;
}

.show-enter-from,
.show-leave-to {
  transition: 0.1s ease-in;
  min-height: 0;
  height: 0;
  padding-bottom: 0;
  margin: 0;
  opacity: 0;
  overflow-y: hidden;
}
</style>