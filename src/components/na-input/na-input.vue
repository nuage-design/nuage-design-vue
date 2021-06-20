<template>
  <div
    ref="root"
    :class="[
      'na-input',
      `na-input--state-${state}`,
      { 'na-input--focused': focused },
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
        <slot name="left-side"></slot>
        <slot name="right-side"></slot>
      </div>

      <!-- message -->
      <div ref="inputMessage">
        <span v-if="state === 'success'" class="na-input__message">
          <i class="bx bxs-check-circle"></i>
          <slot name="message-success"></slot>
        </span>
        <span
          v-else-if="state === 'warning'"
          class="na-input__message na-input__message--warning"
        >
          <i class="bx bxs-info-circle"></i>
          <slot name="message-warning"></slot>
        </span>
        <span
          v-else-if="state === 'danger'"
          class="na-input__message na-input__message--danger"
        >
          <i class="bx bxs-x-circle"></i>
          <slot name="message-danger"></slot>
        </span>
        <span v-else class="na-input__message">
          <slot name="message-default"></slot>
        </span>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import inputMixin, { inputSetup } from '../../mixins/input'

export default defineComponent({
  name: 'NaInput',
  mixins: [inputMixin],
  setup(_props, { slots }) {
    const { root, focused, focus, blur } = inputSetup(slots)
    return { root, focused, focus, blur }
  },
})
</script>
