<template lang="pug">
label.na-switch(:class='classes')
  input(
    type='checkbox',
    :checked='checked',
    :disabled='disabled',
    :value='value'
  )
  span.na-switch__label
    slot
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: null,
    },
    checked: Boolean,
    disabled: Boolean,
  },
  setup(props) {
    const classes = computed(() => [{ 'na-switch--disabled': props.disabled }])

    return { classes }
  },
})
</script>

<style lang="scss">
.na-switch {
  display: inline-block;
  margin: 3px;
  position: relative;
  cursor: pointer;

  &__label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    position: relative;
    margin: 0 -10px;
    line-height: 22px;

    &::before {
      transition: 0.1s ease-in-out;
      content: '';
      display: inline-block;
      min-width: 40px;
      height: 22px;
      flex-shrink: 0;
      flex-grow: 0;
      border-radius: 11px;
      box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.25);
      background-color: var(--primary-800);
      margin: 0 10px;
    }

    &::after {
      width: 16px;
      height: 16px;
      position: absolute;
      transition: 0.1s ease-in-out;
      content: '';
      border-radius: 8px;
      margin: 0 10px;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
      background-color: var(--white);
      left: 3px;
    }
  }

  > input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:active + .na-switch__label {
      &::after {
        transition: 0.1s ease-in-out;
        width: 34px;
      }
    }

    &:not(:disabled) {
      &:not(:checked) + .na-switch__label:hover::before {
        border-color: var(--primary-400);
      }
    }

    &:focus {
      & + .na-switch__label::before {
        border-color: var(--primary-400);
        box-shadow: 0 0 0 5px var(--primary-transparent-200);
      }

      &:not(:checked) + .na-switch__label::before {
        border-color: var(--primary-400);
      }
    }

    & + .na-switch__label::after {
      filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25));
    }

    &:checked + .na-switch__label {
      &::before {
        background-color: var(--primary-400);
      }
      &::after {
        left: 21px;
      }
    }

    &:checked:active + .na-switch__label {
      &::after {
        left: 3px;
      }
    }
  }

  &--disabled {
    opacity: 0.2;
  }
}
</style>