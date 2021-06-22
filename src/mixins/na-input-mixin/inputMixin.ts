import { defineComponent, ref, Slots } from 'vue'

export const inputMixin = defineComponent({
  props: {
    modelValue: {
      type: String,
      default: null,
    },
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
})

export const inputSetup = (slots: Slots) => {
  const root = ref<HTMLDivElement>()

  const focused = ref(false)

  const leftSidePadding = slots['left-side'] ? 23 : 0
  const rightSidePadding = slots['right-side'] ? 30 : 0

  const focus = (): void => {
    focused.value = true
  }

  const blur = (): void => {
    focused.value = false
  }

  return {
    root,
    focused,

    leftSidePadding,
    rightSidePadding,

    focus,
    blur,
  }
}
