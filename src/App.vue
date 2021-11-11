<template>
  <na-button>
    <span>Кнопка</span>
    <i class="bx bxs-heart"></i>
  </na-button>
</template>

<script lang="ts">
import './styles'
import '../node_modules/boxicons/css/boxicons.css'

import { defineComponent } from 'vue'
import { NaButton } from './components/na-button'

export default defineComponent({
  name: 'App',
  components: {
    NaButton,
  },
})
</script>

<style lang="scss"></style>
