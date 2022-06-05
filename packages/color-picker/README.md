# @oysterlee/vue-color-picker
[![npm](https://img.shields.io/npm/v/@oysterlee/vue-color-picker)](https://www.npmjs.com/package/@oysterlee/vue-color-picker)
[![Download](https://img.shields.io/npm/dw/@oysterlee/vue-color-picker)](https://www.npmjs.com/package/@oysterlee/vue-color-picker)
[![Bundle Size](https://img.shields.io/bundlephobia/min/@oysterlee/vue-color-picker)](https://www.npmjs.com/package/@oysterlee/vue-color-picker)
[![LICENSE](https://img.shields.io/github/license/OysterD3/vue-color-picker)](https://github.com/OysterD3/vue-color-picker)

A lightweight color picker component for Vue 3 apps. Inspired by [react-colorful](https://github.com/omgovich/react-colorful)

## Features
- One dependency

## Installation
```shell
pnpm i @oysterlee/vue-color-picker
# or
npm i @oysterlee/vue-color-picker
# or
yarn add @oysterlee/vue-color-picker
```

## How to use
```javascript
// main.js
import { createApp } from "vue";
import ColorPicker from "@oysterlee/vue-color-picker";
import App from "./App.vue";

createApp(App).use(ColorPicker).mount("#app");

// component.vue
<VColorPicker v-model="rgb" v-model:alpha="alpha" mode="rgb" />
```

### Type
```typescript
type RGB = { r: number; g: number; b: number };
type RGBA = RGB & { a: number };
type HSV = { h: number; s: number; v: number };
type HSVA = HSV & { a: number };
type HSL = { h: number; s: number; l: number };
type HSLA = HSL & { a: number };
type Interaction = {
  top: number;
  left: number;
};
type Color = RGB | HSV | HSL | string;
type AvailableColorType = "rgb" | "hex" | "hsl" | "hsv";

type Props = {
  mode: AvailableColorType;
  modelValue: Color;
  alpha: number;
}
```

## Demo
https://oysterd3.github.io/vue-color-picker/
