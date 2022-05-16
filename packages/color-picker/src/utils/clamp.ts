import { clamp } from "@oysterlee/utils";

export const clampPercentage = (n: number) => clamp(n, 0, 100);
