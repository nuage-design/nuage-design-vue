<template>
  <div :class="['na-input', `na-input--state-${state}`]">
    <label>
      <span v-if="label" ref="label" class="na-input__label">{{ label }}</span>
      <input ref="input" class="na-input__input" :placeholder="placeholder" />
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

export default defineComponent({
  name: 'NaInput',
  props: {
    placeholder: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },

    state: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['default', 'success', 'warning', 'danger'].includes(value)
      },
    },
  },
  setup() {
    return {}
  },
})
</script>
