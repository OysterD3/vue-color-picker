import { clamp } from "@oysterlee/utils";

export const clampRGB = (n: number) => clamp(n, 0, 255);
export const clampPercentage = (n: number) => clamp(n, 0, 100);
