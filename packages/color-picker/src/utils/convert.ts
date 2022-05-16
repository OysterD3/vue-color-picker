/**
 * Credits: https://stackoverflow.com/users/860099/kamil-kie%c5%82czewski
 * I have modified some part based on the answer given by Kamil
 */
import type { RGBA, HSVA, HSLA } from "../types";
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

export const RGBAtoHSVA = (rgba: RGBA): HSVA => {
  const { r, g, b, a } = rgba;
  const v = Math.max(r, g, b),
    c = v - Math.min(r, g, b);
  const h =
    c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return {
    h: 60 * (h < 0 ? h + 6 : h),
    s: round(v && (c / v) * 100),
    v: round((v / 255) * 100),
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

export const HSVAtoRGBString = (hsva: HSVA): string => {
  const { r, g, b } = HSVAtoRGBA(hsva);
  return `rgb(${r}, ${g}, ${b})`;
};

export const HSVAtoRGBAString = (hsva: HSVA): string => {
  const { r, g, b, a } = HSVAtoRGBA(hsva);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const HSLAtoRGBA = (hsla: HSLA): RGBA => {
  const { h, s, l, a } = hsla;
  const c = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12) =>
    l - c * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return {
    r: f(0),
    g: f(8),
    b: f(4),
    a,
  };
};

export const HexToHSVA = (hex: string): HSVA => RGBAtoHSVA(HexToRGBA(hex));
export const HSVAToHex = (hsva: HSVA): string => RGBAtoHex(HSVAtoRGBA(hsva));
