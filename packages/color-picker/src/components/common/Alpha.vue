<script setup lang="ts">
import { computed, ref } from "vue";
import type { HSVA, Interaction } from "../../types";
import { HSVAtoRGBA, HSVAtoRGBAString } from "../../utils/convert";
import Interactive from "./Interactive.vue";
import Marker from "./Marker.vue";

const props = defineProps<{
  modelValue: HSVA;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: HSVA): void;
  (e: "update:moving", val: boolean): void;
}>();

const backgroundStyle = computed(() => {
  const { r, g, b } = HSVAtoRGBA(props.modelValue);
  return {
    backgroundImage: `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 0), rgb(${r}, ${g}, ${b}))`,
  };
});

const handleMove = ({ left }: Interaction) => {
  emit(
    "update:modelValue",
    Object.assign({}, props.modelValue, {
      a: left / 100,
    }),
  );
};
</script>

<template>
  <div class="vue-color-picker__alpha" :data-alpha="props.modelValue.a">
    <Interactive
      @update:moving="emit('update:moving', $event)"
      @move="handleMove"
    >
      <div
        :style="backgroundStyle"
        class="vue-color-picker__alpha-background"
      ></div>
      <Marker
        :left="props.modelValue.a * 100"
        :color="HSVAtoRGBAString(props.modelValue)"
      />
    </Interactive>
  </div>
</template>
