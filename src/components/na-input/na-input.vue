<template>
  <div
    ref="root"
    :class="[
      'na-input',
      `na-input--state-${state}`,
      { 'na-input--focused': focused },
    ]"
    :style="[
      `--left-side-padding:${leftSidePadding}px;`,
      `--right-side-padding:${rightSidePadding}px;`,
    ]"
  >
    <label>
      <span v-if="label" ref="label" class="na-input__label">{{ label }}</span>

      <input
        ref="input"
        class="na-input__input"
        @focus="focus"
        @blur="blur"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
      />

      <div class="na-input__internal-elements">
        <div class="na-input__left-side">
          <slot name="left-side"></slot>
        </div>
        <div class="na-input__right-side">
          <slot name="right-side"></slot>
        </div>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { inputMixin, inputSetup } from '../../mixins/na-input-mixin'

export default defineComponent({
  name: 'NaInput',
  emits: ['update:modelValue'],
  mixins: [inputMixin],
  setup: (_, { slots }) => {
    const {
      leftSidePadding,
      rightSidePadding,
      focused,
      focus,
      blur,
    } = inputSetup(slots)
    return { leftSidePadding, rightSidePadding, focused, focus, blur }
  },
})
</script>
