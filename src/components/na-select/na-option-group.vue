<template>
  <optgroup v-if="isNative && !isFilter" :label="label" :disabled="disabled">
    <slot></slot>
  </optgroup>
  <div
    :disabled="disabled"
    v-else-if="label"
    ref="optionGroup"
    :class="['na-option-group', { 'na-option-group--disabled': disabled }]"
  >
    <transition name="show">
      <div v-show="show" ref="label" class="na-option-group__label">
        {{ label }}
      </div>
    </transition>
    <slot></slot>
  </div>
  <slot v-else></slot>
</template>

<script lang="ts">
import { defineComponent, provide, inject, nextTick, ref } from 'vue'

import { Emitter } from 'mitt'

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
    const emitter = inject<Emitter>('emitter')
    const isNative = inject<Boolean>('native')
    const isFilter = inject<Boolean>('filter')

    // Data
    const show = ref(true)

    nextTick(() => {
      emitter?.emit('add-option-group', {
        element: optionGroup.value,
        show,
      })
    })

    return { optionGroup, isNative, isFilter, show }
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