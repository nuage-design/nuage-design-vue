<template>
  <h1>Hello</h1>
  <na-button-group>
    <na-button buttonStyle="border"><span>Button</span></na-button>
    <na-button><span>Button</span></na-button>
    <na-button buttonStyle="border"><span>Button</span></na-button>
  </na-button-group>
  <br />
  <na-select size="1">
    <na-option>Hello 1</na-option>
    <na-option>Hello 22222222222222</na-option>
    <na-option>Hello 3</na-option>
    <na-option>Hello 4</na-option>
    <na-option>Hello 5</na-option>
  </na-select>
</template>

<script>
import "./styles/_fonts.css";
import "./styles/_colors.css";

import { NaButton, NaButtonGroup } from "./components/na-button";
import { NaSelect, NaOption } from "./components/na-select";

export default {
  components: { NaButton, NaButtonGroup, NaSelect, NaOption },
  name: "App",
};
</script>