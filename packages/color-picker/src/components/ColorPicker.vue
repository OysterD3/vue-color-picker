<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { AvailableColorType, Color, HSL, HSV, HSVA, RGB } from "../types";
import {
  HexToHSVA,
  HSLAtoHSVA,
  HSVAToHex,
  HSVAtoHSLA,
  HSVAtoRGBA,
  RGBAtoHSVA,
} from "../utils/convert";
import { isHex, isHSL, isHSV, isRGB } from "../utils/is";
import Alpha from "./common/Alpha.vue";
import Hue from "./common/Hue.vue";
import Saturation from "./common/Saturation.vue";
import "../styles/index.scss";

const props = withDefaults(
  defineProps<{
    mode?: AvailableColorType;
    modelValue?: Color;
    alpha?: number;
  }>(),
  {
    mode: "rgb",
    alpha: 1,
    modelValue: undefined,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", val: Color): void;
  (e: "update:alpha", val: number): void;
}>();

const _hsva = ref<HSVA>({
  h: 0,
  s: 100,
  v: 100,
  a: 1,
});

const triggerChange = (data?: Color) => {
  const v = data || props.modelValue;
  if (props.mode === "rgb" && isRGB(v)) {
    _hsva.value = RGBAtoHSVA({ ...(v as RGB), a: props.alpha });
  }
  if (props.mode === "hex" && isHex(v)) {
    _hsva.value = { ...HexToHSVA(v as string), a: props.alpha };
  }
  if (props.mode === "hsv" && isHSV(v)) {
    _hsva.value = { ...(v as HSV), a: props.alpha };
  }
  if (props.mode === "hsl" && isHSL(v)) {
    _hsva.value = HSLAtoHSVA({ ...(v as HSL), a: props.alpha });
  }
};

onMounted(() => {
  triggerChange();
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      triggerChange(val);
    }
  },
  {
    deep: true,
  },
);

const hsva = computed<HSVA>({
  get() {
    return _hsva.value;
  },
  set(val) {
    const { a, ...hsv } = val;
    emit("update:alpha", a);
    switch (props.mode) {
      case "hex":
        emit("update:modelValue", HSVAToHex(val));
        break;
      case "hsl": {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { a: _, ...hsl } = HSVAtoHSLA(val);
        emit("update:modelValue", hsl);
        break;
      }
      case "hsv":
        emit("update:modelValue", hsv);
        break;
      case "rgb": {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { a: _, ...rgb } = HSVAtoRGBA(val);
        emit("update:modelValue", rgb);
        break;
      }
    }
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
