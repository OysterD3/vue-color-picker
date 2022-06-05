/**
 * Credits: https://stackoverflow.com/users/860099/kamil-kie%c5%82czewski
 * I have modified some part based on the answer given by Kamil
 */
import type { RGBA, HSVA, HSLA } from "../types";
import { clampPercentage } from "./clamp";
import { round } from "./round";

export const HexToRGBA = (hex: string): RGBA => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 1,
      }
    : {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      };
};

export const HexToHSVA = (hex: string): HSVA => RGBAtoHSVA(HexToRGBA(hex));

export const RGBAtoHSVA = (rgba: RGBA): HSVA => {
  // eslint-disable-next-line prefer-const
  let { r, g, b, a } = rgba;
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  let h = 0;
  if (max === r) {
    h = 60 * (((g - b) / diff) % 6);
  } else if (max === g) {
    h = 60 * ((b - r) / diff + 2);
  } else if (max === b) {
    h = 60 * ((r - g) / diff + 4);
  }
  return {
    h: round(h, 0),
    s: round((max ? diff / max : 0) * 100),
    v: round(max * 100),
    a,
  };
};

export const RGBAtoHex = (rgba: RGBA): string => {
  const { r, g, b } = rgba;
  return (
    "#" +
    [r, g, b]
      .map((x) =>
        Math.round(x * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
};

export const RGBAtoHSLA = (rgba: RGBA): HSLA => {
  // eslint-disable-next-line prefer-const
  let { r, g, b, a } = rgba;
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  if (max === r) {
    h = 60 * (((g - b) / diff) % 6);
  } else if (max === g) {
    h = 60 * ((b - r) / diff + 2);
  } else if (max === b) {
    h = 60 * ((r - g) / diff + 4);
  }

  const l = (max + min) / 2;

  return {
    h,
    s: round((diff ? diff / (1 - Math.abs(2 * l - 1)) : 0) * 100, 2),
    l: round(l * 100, 2),
    a,
  };
};

export const HSVAtoRGBA = (hsva: HSVA): RGBA => {
  const { h, a } = hsva;
  let { s, v } = hsva;
  s /= 100;
  v /= 100;
  const f = (n: number, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return {
    r: round(f(5) * 255, 0),
    g: round(f(3) * 255, 0),
    b: round(f(1) * 255, 0),
    a,
  };
};

export const HSVAtoHSLA = (hsva: HSVA): HSLA => RGBAtoHSLA(HSVAtoRGBA(hsva));

export const HSVAtoRGBString = (hsva: HSVA): string => {
  const { r, g, b } = HSVAtoRGBA(hsva);
  return `rgb(${r}, ${g}, ${b})`;
};

export const HSVAtoRGBAString = (hsva: HSVA): string => {
  const { r, g, b, a } = HSVAtoRGBA(hsva);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const HSVAToHex = (hsva: HSVA): string => RGBAtoHex(HSVAtoRGBA(hsva));

export const HSLAtoRGBA = (hsla: HSLA): RGBA => {
  const { h, a } = hsla;
  let { s, l } = hsla;
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let rgb = { r: 0, g: 0, b: 0 };
  if (0 <= h && h < 60) {
    rgb = { r: c, g: x, b: 0 };
  } else if (h < 120) {
    rgb = { r: x, g: c, b: 0 };
  } else if (h < 180) {
    rgb = { r: 0, g: c, b: x };
  } else if (h < 240) {
    rgb = { r: 0, g: x, b: c };
  } else if (h < 300) {
    rgb = { r: x, g: 0, b: c };
  } else {
    rgb = { r: c, g: 0, b: x };
  }

  const { r, g, b } = rgb;

  return {
    r: round((r + m) * 255, 0),
    g: round((g + m) * 255, 0),
    b: round((b + m) * 255, 0),
    a,
  };
};

export const HSLAtoHSVA = (hsla: HSLA): HSVA => RGBAtoHSVA(HSLAtoRGBA(hsla));
