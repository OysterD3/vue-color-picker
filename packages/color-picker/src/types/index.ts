export type RGB = { r: number; g: number; b: number };
export type RGBA = RGB & { a: number };
export type HSV = { h: number; s: number; v: number };
export type HSVA = HSV & { a: number };
export type HSL = { h: number; s: number; l: number };
export type HSLA = HSL & { a: number };
export type Interaction = {
  top: number;
  left: number;
};
export type Color = RGB | HSV | HSL | string;
export type AvailableColorType = "rgb" | "hex" | "hsl" | "hsv";
