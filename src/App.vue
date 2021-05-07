<template>
  <h1>Hello</h1>
  <na-badge :value="100" />
  <na-button>Button</na-button>
</template>

<script>
import "./styles/_fonts.css";
import "./styles/_colors.css";

import naBadge from "./components/na-badge";
import naButton from "./components/na-button";

export default {
  components: { naBadge, naButton },
  name: "App",
};
</script>