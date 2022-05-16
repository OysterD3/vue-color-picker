<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { HSL, HSV, HSVA, RGB } from "../types";
import {
  HexToHSVA,
  HSLAtoHSVA,
  HSVAToHex,
  HSVAtoHSLA,
  HSVAtoRGBA,
  RGBAtoHSVA,
} from "../utils/convert";
import Alpha from "./common/Alpha.vue";
import Hue from "./common/Hue.vue";
import Saturation from "./common/Saturation.vue";
import "../styles/index.scss";

const props = defineProps<{
  rgb?: RGB;
  hex?: string;
  hsv?: HSV;
  hsl?: HSL;
  alpha?: number;
}>();

const emit = defineEmits<{
  (e: "update:rgb", val: RGB): void;
  (e: "update:hex", val: string): void;
  (e: "update:hsv", val: HSV): void;
  (e: "update:hsl", val: HSL): void;
  (e: "update:alpha", val: number): void;
}>();

const _hsva = ref<HSVA>({
  h: 0,
  s: 100,
  v: 100,
  a: 1,
});

onMounted(() => {
  const a = props.alpha || 1;
  if (props.rgb) {
    _hsva.value = RGBAtoHSVA({ ...props.rgb, a });
  }
  if (props.hex) {
    _hsva.value = { ...HexToHSVA(props.hex), a };
  }
  if (props.hsv) {
    _hsva.value = { ...props.hsv, a };
  }
  if (props.hsl) {
    _hsva.value = HSLAtoHSVA({ ...props.hsl, a });
  }
});

const hsva = computed<HSVA>({
  get() {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { a: a1, ...hsl } = HSVAtoHSLA(val);
    emit("update:hsl", hsl);

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
