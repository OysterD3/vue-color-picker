<script setup lang="ts">
import { computed, ref } from "vue";
import { HSVA } from "../../types";
import { clampPercentage } from "../../utils/clamp";
import { HSVAtoRGBA, HSVAtoRGBAString } from "../../utils/convert";
import Marker from "./Marker.vue";

const alpha = ref<HTMLDivElement | null>(null);

const props = defineProps<{
  modelValue: HSVA;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: HSVA): void;
}>();

const backgroundStyle = computed(() => {
  const { r, g, b } = HSVAtoRGBA(props.modelValue);
  return {
    backgroundImage: `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 0), rgb(${r}, ${g}, ${b}))`,
  };
});

const startDragAlpha = (e: PointerEvent) => {
  if (alpha.value) {
    alpha.value.onpointermove = (ev) => {
      const rect = (alpha.value as HTMLDivElement).getBoundingClientRect();
      const percentage = clampPercentage(
        ((ev.x - rect.left) / (alpha.value as HTMLDivElement).offsetWidth) *
          100,
      );
      emit(
        "update:modelValue",
        Object.assign({}, props.modelValue, {
          a: percentage / 100,
        }),
      );
    };
    alpha.value.setPointerCapture(e.pointerId);
  }
};

const stopDragAlpha = (e: PointerEvent) => {
  if (alpha.value) {
    alpha.value.onpointermove = null;
    alpha.value.releasePointerCapture(e.pointerId);
  }
};
</script>

<template>
  <div
    ref="alpha"
    class="vue-color-picker__alpha"
    @pointerdown="startDragAlpha"
    @pointerup="stopDragAlpha"
  >
    <div
      :style="backgroundStyle"
      class="vue-color-picker__alpha-background"
    ></div>
    <Marker
      :left="props.modelValue.a * 100"
      :color="HSVAtoRGBAString(props.modelValue)"
    />
  </div>
</template>
