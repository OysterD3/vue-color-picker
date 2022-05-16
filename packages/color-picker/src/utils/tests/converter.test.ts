import { HSVAtoRGBA, RGBAtoHSVA } from "../convert";

describe("Converter", () => {
  it("should be hsv(240, 1, 1)", () => {
    expect(RGBAtoHSVA({ r: 0, g: 0, b: 255, a: 1 })).toEqual({
      h: 240,
      s: 100,
      v: 100,
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
});
