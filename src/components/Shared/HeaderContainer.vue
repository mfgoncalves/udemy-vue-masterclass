<template>
  <div class="w-full border-b border-solid border-brand-gray-1">
    <div class="mx-auto my-16 text-center">
      <slot name="title" />
      <slot name="subtitle" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderContainer",
});
</script>
