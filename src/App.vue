<script setup lang="ts">
import 'boxicons/css/boxicons.min.css'
import './styles'

import { NaBadge } from './components/na-badge'
import { NaButton, NaButtonGroup } from './components/na-button'
import { NaCheckbox } from './components/na-checkbox'
import { NaRadio } from './components/na-radio'
import { NaInput } from './components/na-input'
import { NaSwitch } from './components/na-switch'
</script>

<template lang="pug">
na-badge(value="124")
br
na-button
  span Кнопка
  i.bx.bxs-heart
br
na-button-group
  na-button
    span Кнопка 1
  na-button(disabled)
    span Кнопка 2
  na-button
    span Кнопка 3
  na-button
    span Кнопка 4
br
na-checkbox Checkbox 1
br
na-checkbox(disabled)
  | Checkbox 2
br
na-checkbox Checkbox 3
br
na-checkbox Checkbox 4
br
br
na-radio(name="test")
  | Radio 1
br
na-radio(name="test" disabled)
  | Radio 2
br
na-radio(name="test")
  | Radio 3
br
na-radio(name="test")
  | Radio 4
br
br
na-switch Switch 1
br
na-switch(disabled)
  | Switch 2
br
na-switch Switch 3
br
na-switch Switch 4
br
br
na-input(label="Label" placeholder="Placeholder" style="width: 270px")
  template(#message-default)
    | Help me
  template(#message-success)
    | You are good man!
  template(#message-warning)
    | Don't worry, be happy! Don't worry, be happy!
  template(#message-danger)
    | Danger!
  template(#left-side)
    i.bx.bxs-lock-alt
  template(#right-side)
    na-button(equal size="small" type="transparent")
      i.bx.bx-low-vision
br
</template>

<style></style>
