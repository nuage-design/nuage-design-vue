<template>
  <div :class="classes">
    <transition name="fade" mode="out-in">
      <div
        v-show="visible"
        ref="tooltipContainer"
        style="left: auto; right: auto"
        class="na-tooltip__container"
      >
        <div class="na-tooltip__content">
          <slot name="message"></slot>
        </div>
        <img class="na-tooltip__beak" src="./assets/beak.svg" />
      </div>
    </transition>
    <div
      @mouseover="mouseover"
      @mouseout="mouseout"
      ref="tooltipSlot"
      class="na-tooltip__slot"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  props: {
    position: {
      type: String,
      default: 'top',
    },
  },
  setup(props) {
    const visible = ref(false)
    const tooltipContainer = ref<HTMLDivElement>()
    const tooltipSlot = ref<HTMLDivElement>()

    const mouseover = (e: MouseEvent): void => {
      visible.value = true
      if (tooltipContainer.value?.style.left) {
        setTimeout(() => {
          if (tooltipContainer.value?.style.left) {
            const width = tooltipContainer.value.clientWidth
            const height = tooltipContainer.value.clientHeight

            const clientWidth = document.documentElement.clientWidth
            const x = e.offsetX

            tooltipContainer.value.style.top = `${-height}px`

            if (width / 2 + 10 < e.x) {
              tooltipContainer.value.style.left = `${x - width / 2}px`
            } else {
              tooltipContainer.value.style.left = `${x - e.x + 10}px`
            }

            console.log(e.x, clientWidth - width / 2 - 10)
            if (e.x > clientWidth - width / 2 - 10) {
              tooltipContainer.value.style.left = `${
                clientWidth - width - 30
              }px`
            }
          }
        })
      }
    }

    const mouseout = (e: MouseEvent): void => {
      visible.value = false

      if (tooltipContainer.value?.style.left) {
        // console.log(e.x)
      }
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
      tooltipContainer,
      tooltipSlot,
    }
  },
})
</script>

<style lang="scss">
.na-tooltip {
  display: inline-block;
  position: relative;
  & > * {
    position: relative;
  }

  &__container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999999;
    filter: drop-shadow(0px 4px 4px rgba(218, 195, 195, 0.5));

    width: max-content;
    display: flex;
    align-items: center;
  }

  &__beak {
    position: relative;
  }

  &--position {
    &-top {
      .na-tooltip__container {
        flex-direction: column;
        top: -1px;
      }
    }
    &-bottom {
      .na-tooltip__container {
        flex-direction: column-reverse;
      }
      .na-tooltip__beak {
        transform: rotate(180deg);
        bottom: -1px;
      }
    }
    &-left {
      .na-tooltip__container {
        flex-direction: row;
      }
      .na-tooltip__beak {
        width: 23px;
        left: -6px;
        transform: rotate(270deg);
      }
    }
    &-right {
      .na-tooltip__container {
        flex-direction: row-reverse;
      }
      .na-tooltip__beak {
        width: 23px;
        right: -6px;
        transform: rotate(90deg);
      }
    }
  }
}

.na-tooltip__content {
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
