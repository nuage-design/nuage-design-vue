import { defineComponent, onMounted, ref, Slots } from 'vue'

export default defineComponent({
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

export function inputSetup(slots: Slots) {
  const root = ref<HTMLDivElement>()

  const focused = ref(false)

  const leftSidePadding = slots['left-side'] ? 23 : 0
  const rightSidePadding = slots['right-side'] ? 30 : 0

  onMounted(() => {
    root.value?.style.setProperty('--left-side-padding', leftSidePadding + 'px')
    root.value?.style.setProperty(
      '--right-side-padding',
      rightSidePadding + 'px',
    )
  })

  const focus = (): void => {
    focused.value = true
  }

  const blur = (): void => {
    setTimeout(() => (focused.value = false))
  }

  return {
    root,
    focused,

    focus,
    blur,
  }
}
