import type { App, Plugin } from "vue";
import ColorPicker from "./components/ColorPicker.vue";

export const ColorPickerPlugin: Plugin = {
  install(app: App) {
    app.component("VColorPicker", ColorPicker);
  },
};
export { ColorPicker };
