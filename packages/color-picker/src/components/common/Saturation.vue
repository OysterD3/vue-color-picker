<script setup lang="ts">
import { computed } from "vue";
import type { HSVA, Interaction } from "../../types";
import { HSVAtoRGBString } from "../../utils/convert";
import Interactive from "./Interactive.vue";
import Marker from "./Marker.vue";

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

const handleMove = ({ top, left }: Interaction) => {
  emit(
    "update:modelValue",
    Object.assign({}, props.modelValue, {
      s: left,
      v: 100 - top,
    }),
  );
};
</script>

<template>
  <div class="vue-color-picker__saturation" :style="style">
    <Interactive @move="handleMove">
      <Marker
        :top="100 - props.modelValue.v"
        :left="props.modelValue.s"
        :color="HSVAtoRGBString(Object.assign({}, modelValue, { a: 1 }))"
      />
    </Interactive>
  </div>
</template>
