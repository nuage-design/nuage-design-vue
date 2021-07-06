<template lang="pug">
label.na-radio(:class='classes')
  input(
    type='radio',
    :checked='checked',
    :disabled='disabled',
    :value='value',
    :name='name'
  )
  span.na-radio__label
    slot
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'NaRadio',
  props: {
    value: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    checked: Boolean,
    disabled: Boolean,
  },
  setup(props) {
    const classes = computed(() => [{ 'na-radio--disabled': props.disabled }])

    return { classes }
  },
})
</script>

<style lang="scss">
.na-radio {
  display: inline-block;
  margin: 3px;
  cursor: pointer;

  &__label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    position: relative;
    margin: 0 -10px;

    &::before {
      transition: 0.1s ease-in-out;
      content: '';
      display: inline-block;
      width: 19px;
      height: 19px;
      flex-shrink: 0;
      transform: scale(1);
      flex-grow: 0;
      border: 2px solid var(--primary-transparent-200);
      background-repeat: no-repeat;
      background-position: center center;
      margin: 0 10px;

      border-radius: 50%;
    }

    &::after {
      width: 9px;
      height: 9px;
      transform: scale(0);
      position: absolute;
      transition: 0.1s ease-in-out;
      content: '';
      background-repeat: no-repeat;
      background-position: center center;

      border-radius: 50%;
      left: 15px;
    }
  }

  > input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:not(:disabled) {
      & + .na-radio__label:hover::before {
        border-color: var(--primary-400);
      }
    }

    &:focus {
      & + .na-radio__label::before {
        box-shadow: 0 0 0 5px var(--primary-transparent-200);
      }
    }

    &:checked + .na-radio__label {
      &::before {
        border-color: var(--primary-400);
      }
      &::after {
        transform: scale(1);
        background-color: var(--primary-400);
      }
    }
  }

  &--disabled {
    opacity: 0.2;
  }
}
</style>