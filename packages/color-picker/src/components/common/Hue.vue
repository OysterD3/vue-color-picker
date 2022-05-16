<script setup lang="ts">
import { computed, ref } from "vue";
import type { HSVA } from "../../types";
import { clampPercentage } from "../../utils/clamp";
import { HSVAtoRGBString } from "../../utils/convert";
import { round } from "../../utils/round";

const hue = ref<HTMLDivElement | null>(null);

const props = defineProps<{
  modelValue: HSVA;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: HSVA): void;
}>();

const markerStyle = computed(() => {
  return {
    backgroundColor: HSVAtoRGBString({
      h: props.modelValue.h,
      s: 100,
      v: 100,
      a: 1,
    }),
    left: `${(props.modelValue.h / 360) * 100}%`,
  };
});

const startDragHue = (e: PointerEvent) => {
  if (hue.value) {
    hue.value.onpointermove = (ev) => {
      const rect = (hue.value as HTMLDivElement).getBoundingClientRect();

      const percentage = round(
        clampPercentage(
          ((ev.x - rect.left) / (hue.value as HTMLDivElement).offsetWidth) *
            100,
        ),
      );
      emit(
        "update:modelValue",
        Object.assign({}, props.modelValue, {
          h: round((360 * percentage) / 100, 0),
        }),
      );
    };
    hue.value.setPointerCapture(e.pointerId);
  }
};

const stopDragHue = (e: PointerEvent) => {
  if (hue.value) {
    hue.value.onpointermove = null;
    hue.value.releasePointerCapture(e.pointerId);
  }
};
</script>

<template>
  <div
    ref="hue"
    class="vue-color-picker__hue"
    @pointerdown="startDragHue"
    @pointerup="stopDragHue"
  >
    <div :style="markerStyle" class="vue-color-picker__marker"></div>
  </div>
</template>
