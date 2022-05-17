<script setup lang="ts">
import { ref } from "vue";
import type { Interaction } from "../../types";
import { clampPercentage } from "../../utils/clamp";

const interactive = ref<HTMLDivElement | null>(null);
const emit = defineEmits<{
  (e: "move", val: Required<Interaction>): void;
}>();

const handlePointerDown = (e: PointerEvent) => {
  if (interactive.value) {
    const rect = (interactive.value as HTMLDivElement).getBoundingClientRect();
    emit("move", {
      top: clampPercentage(
        ((e.y - rect.top) /
          (interactive.value as HTMLDivElement).offsetHeight) *
          100,
      ),
      left: clampPercentage(
        ((e.x - rect.left) /
          (interactive.value as HTMLDivElement).offsetWidth) *
          100,
      ),
    });
    interactive.value.onpointermove = (ev) => {
      emit("move", {
        top: clampPercentage(
          ((ev.y - rect.top) /
            (interactive.value as HTMLDivElement).offsetHeight) *
            100,
        ),
        left: clampPercentage(
          ((ev.x - rect.left) /
            (interactive.value as HTMLDivElement).offsetWidth) *
            100,
        ),
      });
    };
    interactive.value.setPointerCapture(e.pointerId);
  }
};

const handlePointerUp = (e: PointerEvent) => {
  if (interactive.value) {
    interactive.value.onpointermove = null;
    interactive.value.releasePointerCapture(e.pointerId);
  }
};
</script>

<template>
  <div
    ref="interactive"
    class="vue-color-picker__interactive"
    @pointerdown="handlePointerDown"
    @pointerup="handlePointerUp"
  >
    <slot />
  </div>
</template>
