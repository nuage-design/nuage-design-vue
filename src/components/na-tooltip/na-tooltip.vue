<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  props: {
    position: {
      type: String,
      default: 'top',
    },
    tip: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const visible = ref(false)

    const mouseover = (e: MouseEvent): void => {
      visible.value = true
    }

    const mouseout = (e: MouseEvent): void => {
      visible.value = false
    }

    const classes = computed(() => [
      'na-tooltip',
      `na-tooltip--position-${props.position}`,
    ])

    return {
      classes,
      mouseover,
      mouseout,
      visible,
    }
  },
})
</script>

<style lang="scss">
.na-tooltip {
  display: inline-block;
  position: relative;

  &__container {
    position: absolute;
    filter: drop-shadow(0px 4px 4px rgba(218, 195, 195, 0.5));

    width: max-content;
    display: flex;
    align-items: center;
  }

  &__beak {
    position: relative;
  }
}

.na-tooltip__tip {
  background-color: var(--dark-800);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Nunito Sans', sans-serif;
  line-height: 100%;

  min-width: 34px;
  min-height: 34px;
}

.fade-enter-active {
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  transition-delay: 0.3s;
}

.fade-leave-active {
  transition: transform 0.2s cubic-bezier(1, 0.5, 0.8, 1),
    opacity 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  transition-delay: 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
