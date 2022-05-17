<script setup lang="ts">
import { ref } from "vue";
import type { HSVA, Interaction } from "../../types";
import { HSVAtoRGBString } from "../../utils/convert";
import { round } from "../../utils/round";
import Interactive from "./Interactive.vue";
import Marker from "./Marker.vue";

const hue = ref<HTMLDivElement | null>(null);

const props = defineProps<{
  modelValue: HSVA;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: HSVA): void;
}>();

const handleMove = ({ left }: Interaction) => {
  emit(
    "update:modelValue",
    Object.assign({}, props.modelValue, {
      h: round((360 * left) / 100, 0),
    }),
  );
};
</script>

<template>
  <div ref="hue" class="vue-color-picker__hue">
    <Interactive @move="handleMove">
      <Marker
        :color="
          HSVAtoRGBString({
            h: props.modelValue.h,
            s: 100,
            v: 100,
            a: 1,
          })
        "
        :left="(modelValue.h / 360) * 100"
      />
    </Interactive>
  </div>
</template>
