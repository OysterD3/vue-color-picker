<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    top?: number;
    left?: number;
    color: string;
  }>(),
  {
    top: undefined,
    left: 0,
  },
);

const style = computed(() => ({
  top: props.top >= 0 && props.left <= 100 ? `${props.top}%` : undefined,
  left: `${props.left}%`,
  backgroundColor: props.color,
}));
</script>

<template>
  <div :style="style" class="vue-color-picker__marker"></div>
</template>
