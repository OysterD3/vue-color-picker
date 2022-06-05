import { expect } from "vitest";
import { HSLAtoRGBA, HSVAtoRGBA, RGBAtoHSLA, RGBAtoHSVA } from "../convert";

describe("Converter", () => {
  it("should be hsv(240, 1, 1)", () => {
    expect(RGBAtoHSVA({ r: 0, g: 0, b: 255, a: 1 })).toEqual({
      h: 240,
      s: 100,
      v: 100,
      a: 1,
    });
  });

  it("should be hsv(231, 48.7, 15.3)", () => {
    expect(RGBAtoHSVA({ r: 20, g: 23, b: 39, a: 1 })).toEqual({
      h: 231,
      s: 48.72,
      v: 15.29,
      a: 1,
    });
  });

  it("should be hsv(122, 86.33, 54.51", () => {
    expect(RGBAtoHSVA({ r: 19, g: 139, b: 23, a: 1 })).toEqual({
      h: 122,
      s: 86.33,
      v: 54.51,
      a: 1,
    });
  });

  it("should be rgb(19, 139, 23)", () => {
    expect(
      HSVAtoRGBA({
        h: 122,
        s: 86.33,
        v: 54.51,
        a: 1,
      }),
    ).toEqual({ r: 19, g: 139, b: 23, a: 1 });
  });

  it("should be hsl(0, 82.61, 4.51)", () => {
    expect(
      RGBAtoHSLA({
        r: 21,
        g: 2,
        b: 2,
        a: 1,
      }),
    ).toEqual({ h: 0, s: 82.61, l: 4.51, a: 1 });
  });

  it("should be hsl(180, 100, 50)", () => {
    expect(
      RGBAtoHSLA({
        r: 0,
        g: 255,
        b: 255,
        a: 1,
      }),
    ).toEqual({ h: 180, s: 100, l: 50, a: 1 });
  });

  it("should be rgb(76, 38, 38)", () => {
    expect(
      HSLAtoRGBA({
        h: 0,
        s: 33.33,
        l: 22.35,
        a: 1,
      }),
    ).toEqual({ r: 76, g: 38, b: 38, a: 1 });
  });
});
