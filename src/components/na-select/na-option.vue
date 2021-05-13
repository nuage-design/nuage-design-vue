<template>
  <div ref="root" v-if="!native" class="na-option">
    <slot></slot>
  </div>
  <option v-else>
    <slot></slot>
  </option>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
export default {
  name: "NaOption",
  props: {},
  setup() {
    const root = ref<HTMLElement>();
    const native = ref(false);

    onMounted((): void => {
      const parentTag = root.value.parentElement.tagName;
      if (parentTag === "SELECT") native.value = true;
    });

    return { root, native };
  },
};
</script>