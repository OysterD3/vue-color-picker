<script setup lang="ts">
import { computed, ref } from "vue";
import type { HSV, HSVA, RGB } from "../types";
import { HexToHSVA, HSVAToHex, HSVAtoRGBA, RGBAtoHSVA } from "../utils/convert";
import Alpha from "./common/Alpha.vue";
import Hue from "./common/Hue.vue";
import Saturation from "./common/Saturation.vue";

const props = defineProps<{
  rgb?: RGB;
  hex?: string;
  hsv?: HSV;
  alpha?: number;
}>();

const emit = defineEmits<{
  (e: "update:rgb", val: RGB): void;
  (e: "update:hex", val: string): void;
  (e: "update:hsv", val: HSV): void;
  (e: "update:alpha", val: number): void;
}>();

const _hsva = ref<HSVA>({
  h: 0,
  s: 100,
  v: 100,
  a: 1,
});

const hsva = computed<HSVA>({
  get() {
    const a = props.alpha || 1;
    if (props.rgb) {
      return RGBAtoHSVA({ ...props.rgb, a });
    }
    if (props.hex) {
      return { ...HexToHSVA(props.hex), a };
    }
    if (props.hsv) {
      return { ...props.hsv, a };
    }
    return _hsva.value;
  },
  set(val) {
    const { a, ...hsv } = val;
    emit("update:hsv", hsv);
    emit("update:alpha", a);
    emit("update:hex", HSVAToHex(val));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { a: _, ...rgb } = HSVAtoRGBA(val);
    emit("update:rgb", rgb);

    _hsva.value = val;
  },
});
</script>

<template>
  <div class="vue-color-picker__container">
    <Saturation v-model="hsva" />
    <Hue v-model="hsva" />
    <Alpha v-model="hsva" />
  </div>
</template>
