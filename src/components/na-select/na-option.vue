<template>
  <transition name="show">
    <button
      v-if="!isNative"
      v-show="show"
      ref="option"
      class="na-option"
      :value="value"
      :style="optionStyles"
      :class="[
        { 'na-option_selected': selected },
        { 'na-option_disabled': disabled },
        { 'na-option_displayed': show },
      ]"
      @keydown.enter="activate"
      @click="activate"
    >
      <span class="na-option__left-side">
        <slot name="left-side" />
        <span ref="optionTitle" class="na-option__title">
          <slot>{{ value }}</slot>
        </span>
      </span>
      <span v-if="$slots['right-side']" class="na-option__right-side">
        <slot name="right-side" />
      </span>
    </button>
  </transition>

  <option v-if="isNative" :value="value">
    <slot>{{ value }}</slot>
  </option>
</template>

<script lang="ts">
import { Emitter } from 'mitt'
import {
  onMounted,
  ref,
  defineComponent,
  onUnmounted,
  inject,
  nextTick,
  Ref,
} from 'vue'

let $_naOptionId = 0

export default defineComponent({
  name: 'NaOption',
  props: {
    value: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const uid = ++$_naOptionId

    // Template refs
    const option = ref<HTMLButtonElement>()
    const optionTitle = ref<HTMLElement>()

    // Data
    const title = ref('')
    const show = ref(true)
    const selected = ref(false)
    const optionStyles = ref({})

    // Injects
    const emitter = inject<Emitter>('emitter')
    const input = inject<Ref<HTMLInputElement | HTMLSelectElement>>('input')
    const isNative = inject<Boolean>('native')
    const isFilter = inject<Boolean>('filter')

    nextTick(() => {
      emitter?.emit('add-option', option.value)
      emitter?.emit('add-rendered-option', {
        uid,
        title: title.value ? title.value.trim() : props.value,
        value: props.value,
        selected,
      })
    })

    // Hooks
    onMounted(() => {
      if (isNative) return

      title.value = slots['default']
        ? optionTitle.value?.innerText!
        : props.value

      optionStyles.value = slots['right-side']
        ? { '--padding-right': '18px' }
        : { '--padding-right': '38px' }

      if (input?.value && isFilter) {
        input.value.addEventListener('input', filter)
        input.value.addEventListener('focus', filter)
      }
    })

    onUnmounted(() => {
      if (isNative) return

      if (input?.value && isFilter) {
        input.value.removeEventListener('input', filter)
        input.value.removeEventListener('focus', filter)
      }
    })

    // Methods
    const activate = (e: Event) => {
      if (!props.disabled) emitter?.emit('activate', uid)
      else e.stopPropagation()
    }

    const filter = () => {
      const titleValue = title.value?.toLowerCase()
      const inputValue = input!.value.value.toLowerCase()

      show.value = titleValue?.indexOf(inputValue) !== -1
    }

    return {
      // Template refs
      option,
      optionTitle,

      // Data
      title,
      show,
      selected,
      optionStyles,
      isNative,

      // Methods
      activate,
    }
  },
})
</script>

<style scoped>
.show-enter-active,
.show-leave-active {
  transition: 0.1s ease-out;
  padding-top: 0;
  padding-bottom: 0;
  height: 0;
  overflow-y: hidden;
}

.show-enter-from,
.show-leave-to {
  transition: 0.1s ease-in;
  min-height: 0;
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
  opacity: 0;
  overflow-y: hidden;
}
</style>