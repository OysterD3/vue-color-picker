<script setup lang="ts">
import { computed, ref } from "vue";
import { clampPercentage } from "../../utils/clamp";
import type { HSVA } from "../../types";
import { HSVAtoRGBString } from "../../utils/convert";

const props = defineProps<{
  modelValue: HSVA;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: HSVA): void;
}>();

const style = computed(() => ({
  backgroundColor: HSVAtoRGBString({
    h: props.modelValue.h,
    s: 100,
    v: 100,
    a: 1,
  }),
}));

const markerStyle = computed(() => ({
  top: `${100 - props.modelValue.v}%`,
  left: `${props.modelValue.s}%`,
  backgroundColor: HSVAtoRGBString(
    Object.assign({}, props.modelValue, { a: 1 }),
  ),
}));

const marker = ref<HTMLDivElement | null>(null);
const saturation = ref<HTMLDivElement | null>(null);

const startDragSaturation = (e: PointerEvent) => {
  const rect = (saturation.value as HTMLDivElement).getBoundingClientRect();
  if (marker.value) {
    marker.value.style.top = `${clampPercentage(
      ((e.y - rect.top) / (saturation.value as HTMLDivElement).offsetHeight) *
        100,
    )}%`;
    marker.value.style.left = `${clampPercentage(
      ((e.x - rect.left) / (saturation.value as HTMLDivElement).offsetWidth) *
        100,
    )}%`;
  }
  if (saturation.value) {
    saturation.value.onpointermove = (ev) => {
      const rect = (saturation.value as HTMLDivElement).getBoundingClientRect();
      const top = clampPercentage(
        ((ev.y - rect.top) /
          (saturation.value as HTMLDivElement).offsetHeight) *
          100,
      );
      const left = clampPercentage(
        ((ev.x - rect.left) /
          (saturation.value as HTMLDivElement).offsetWidth) *
          100,
      );

      if (marker.value) {
        marker.value.style.top = `${top}%`;
        marker.value.style.left = `${left}%`;
      }
      emit(
        "update:modelValue",
        Object.assign({}, props.modelValue, {
          s: left,
          v: 100 - top,
        }),
      );
    };
    saturation.value.setPointerCapture(e.pointerId);
  }
};

const stopDragSaturation = (e: PointerEvent) => {
  if (saturation.value) {
    saturation.value.onpointermove = null;
    saturation.value.releasePointerCapture(e.pointerId);
  }
};
</script>

<template>
  <div
    ref="saturation"
    class="vue-color-picker__saturation"
    :style="style"
    @pointerdown="startDragSaturation"
    @pointerup="stopDragSaturation"
  >
    <div
      ref="marker"
      :style="markerStyle"
      class="vue-color-picker__marker"
    ></div>
  </div>
</template>
