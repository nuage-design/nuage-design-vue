<template lang="pug">
.na-help-message.na-help-message--state-success(v-if='state === "success"')
  i.bx.bxs-check-circle
  slot(name='message-success')

.na-help-message.na-help-message--state-warning(
  v-else-if='state === "warning"'
)
  i.bx.bxs-info-circle
  slot(name='message-warning')

.na-help-message.na-help-message--state-danger(v-else-if='state === "danger"')
  i.bx.bxs-x-circle
  slot(name='message-danger')

.na-help-message(v-else)
  slot(name='message-default')
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
