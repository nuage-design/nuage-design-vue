<template>
  <div :class="classes">
    <div class="na-tooltip__content">
      <slot></slot>
    </div>
    <img class="na-tooltip__beak" src="./assets/beak.svg" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    position: {
      type: String,
      default: 'top',
    },
  },
  setup(props) {
    const classes = computed(() => [
      'na-tooltip',
      `na-tooltip--position-${props.position}`,
    ])

    return { classes }
  },
})
</script>

<style lang="scss">
.na-tooltip {
  width: max-content;
  display: flex;
  align-items: center;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2));

  & > * {
    position: relative;
  }

  &--position {
    &-top {
      top: -1px;
      flex-direction: column;
    }
    &-bottom {
      flex-direction: column-reverse;
      .na-tooltip__beak {
        bottom: -1px;
        transform: rotate(180deg);
      }
    }
    &-left {
      flex-direction: row;
      .na-tooltip__beak {
        left: -6px;
        width: 23px;
        transform: rotate(270deg);
      }
    }
    &-right {
      flex-direction: row-reverse;
      .na-tooltip__beak {
        right: -6px;
        width: 23px;
        transform: rotate(90deg);
      }
    }
  }
}

.na-tooltip__content {
  background-color: var(--dark-800);
  display: inline-block;
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Nunito Sans', sans-serif;
  line-height: 100%;
}
</style>