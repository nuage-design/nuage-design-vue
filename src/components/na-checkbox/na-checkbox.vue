<template lang="pug">
label.na-checkbox(:class='classes')
  input(
    type='checkbox',
    :checked='checked',
    :disabled='disabled',
    :value='value'
  )
  span.na-checkbox__label
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: string
  checked: boolean
  disabled: boolean
}>()

const classes = computed(() => [{ 'na-checkbox--disabled': props.disabled }])
</script>

<style lang="scss">
.na-checkbox {
  display: inline-block;
  margin: 3px;
  cursor: pointer;
  line-height: 22px;

  &__label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    position: relative;
    margin: 0 -10px;

    &::before {
      transition: 0.2s ease-in-out;
      content: '';
      display: inline-block;
      width: 19px;
      height: 19px;
      flex-shrink: 0;
      transform: scale(1);
      flex-grow: 0;
      border: 2px solid var(--primary-transparent-200);
      border-radius: 6px;
      background-repeat: no-repeat;
      background-position: center center;
      margin: 0 10px;
    }

    &::after {
      width: 19px;
      height: 19px;
      transform: scale(0);
      position: absolute;
      transition: 0.2s ease-in-out;
      content: '';
      border-radius: 6px;
      background-repeat: no-repeat;
      background-position: center center;
      margin: 0 10px;
    }
  }

  > input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:not(:disabled) {
      &:not(:checked) + .na-checkbox__label:hover::before {
        border-color: var(--primary-400);
      }
    }

    &:focus {
      & + .na-checkbox__label::before,
      & + .na-checkbox__label::after {
        box-shadow: 0 0 0 5px var(--primary-transparent-200);
      }

      &:not(:checked) + .na-checkbox__label::before {
        border-color: var(--primary-400);
      }
    }

    &:not(:focus) + .na-checkbox__label::after {
      filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25));
    }

    &:checked + .na-checkbox__label {
      &::before {
        transform: scale(0);
      }
      &::after {
        transform: scale(1);
        background-color: var(--primary-400);
        background-image: url('./assets/check.svg');
      }
    }
  }

  &--disabled {
    opacity: 0.2;
  }
}
</style>
