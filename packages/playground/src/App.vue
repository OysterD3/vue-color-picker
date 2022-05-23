<script setup lang="ts">
import "../../color-picker/src/styles/index.scss";
import type { RGB, HSV, HSL } from "@oysterlee/vue-color-picker/dist/types";
import { computed, ref, watch } from "vue";

const rgb = ref<RGB>({
  r: 255,
  g: 0,
  b: 0,
});
const hsv = ref<HSV>({
  h: 0,
  s: 100,
  v: 100,
});
const hsl = ref<HSL>({
  h: 0,
  s: 100,
  l: 50,
});
const hex = ref("#FF0000");
const alpha = ref(1);

const luminance = computed(() => {
  const { r, g, b } = rgb.value;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
});

const textColor = computed(() => (luminance.value > 0.5 ? "#000" : "#fff"));

watch(
  [rgb, alpha],
  (val) => {
    const { r, g, b } = val[0];
    document.body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${val[1]})`;
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<template>
  <main>
    <div class="vue-color-picker-playground__container">
      <VColorPicker v-model:rgb="rgb" v-model:alpha="alpha" />
      <div
        class="vue-color-picker-playground__input-group"
        :style="{ color: textColor }"
      >
        <label>RGB</label>
        <div class="vue-color-picker-playground__input-wrapper">
          <input v-model.number="rgb.r" />
          <input v-model.number="rgb.g" />
          <input v-model.number="rgb.b" />
        </div>

        <label>HSV</label>
        <div class="vue-color-picker-playground__input-wrapper">
          <input v-model.number="hsv.h" />
          <input v-model.number="hsv.s" />
          <input v-model.number="hsv.v" />
        </div>

        <label>HSL</label>
        <div class="vue-color-picker-playground__input-wrapper">
          <input v-model.number="hsl.h" />
          <input v-model.number="hsl.s" />
          <input v-model.number="hsl.l" />
        </div>

        <label>Hex</label>
        <div class="vue-color-picker-playground__input-wrapper">
          <input v-model="hex" style="width: 200px" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.vue-color-picker-playground {
  &__container {
    display: flex;
    align-items: center;
  }

  &__input-group {
    margin-left: 20px;

    label {
      font-size: 24px;
      font-weight: 700;
    }
  }

  &__input-wrapper {
    display: flex;
    margin-top: 8px;

    input {
      width: 50px;
      border: none;
      border-radius: 4px;
      padding: 4px 8px;
      margin-right: 8px;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
