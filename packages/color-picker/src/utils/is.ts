import { isObject } from "@oysterlee/utils";
import type { HSL, HSV, RGB } from "../types";

export const isRGB = (val: any) => {
  if (isObject(val)) {
    if (
      Object.prototype.hasOwnProperty.call(val, "r") &&
      Object.prototype.hasOwnProperty.call(val, "g") &&
      Object.prototype.hasOwnProperty.call(val, "b")
    ) {
      const obj = val as RGB;
      return (
        obj.r >= 0 &&
        obj.r <= 255 &&
        obj.g >= 0 &&
        obj.g <= 255 &&
        obj.b >= 0 &&
        obj.b <= 255
      );
    }
  }
  return false;
};

export const isHSL = (val: any) => {
  if (isObject(val)) {
    if (
      Object.prototype.hasOwnProperty.call(val, "h") &&
      Object.prototype.hasOwnProperty.call(val, "s") &&
      Object.prototype.hasOwnProperty.call(val, "l")
    ) {
      const obj = val as HSL;
      return (
        obj.h >= 0 &&
        obj.h <= 360 &&
        obj.s >= 0 &&
        obj.s <= 100 &&
        obj.l >= 0 &&
        obj.l <= 100
      );
    }
  }
  return false;
};

export const isHSV = (val: any) => {
  if (isObject(val)) {
    if (
      Object.prototype.hasOwnProperty.call(val, "h") &&
      Object.prototype.hasOwnProperty.call(val, "s") &&
      Object.prototype.hasOwnProperty.call(val, "v")
    ) {
      const obj = val as HSV;
      return (
        obj.h >= 0 &&
        obj.h <= 360 &&
        obj.s >= 0 &&
        obj.s <= 100 &&
        obj.v >= 0 &&
        obj.v <= 100
      );
    }
  }
  return false;
};

export const isHex = (val: any) => {
  return typeof val === "string" && /^#([0-9A-F]{3}){1,2}$/i.test(val);
};
