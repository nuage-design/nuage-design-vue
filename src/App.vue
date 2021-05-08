<template>
  <h1>Hello</h1>
  <na-button-group vertical>
    <na-button buttonStyle="border"><span>Button</span></na-button>
    <na-button><span>Button</span></na-button>
    <na-button buttonStyle="border"><span>Button</span></na-button>
  </na-button-group>
</template>

<script>
import "./styles/_fonts.css";
import "./styles/_colors.css";

import { NaButton, NaButtonGroup } from "./components/na-button";

export default {
  components: { NaButton, NaButtonGroup },
  name: "App",
};
</script>