<template>
  <div
    v-if="state === 'success'"
    class="na-help-message na-help-message--state-success"
  >
    <i class="bx bxs-check-circle"></i>
    <slot name="message-success"></slot>
  </div>
  <div
    v-else-if="state === 'warning'"
    class="na-help-message na-help-message--state-warning"
  >
    <i class="bx bxs-info-circle"></i>
    <slot name="message-warning"></slot>
  </div>
  <div
    v-else-if="state === 'danger'"
    class="na-help-message na-help-message--state-danger"
  >
    <i class="bx bxs-x-circle"></i>
    <slot name="message-danger"></slot>
  </div>
  <div v-else class="na-help-message">
    <slot name="message-default"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NaHelpMessage',
  props: {
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
