import { round } from "../round";

describe("Round", () => {
  it("should be 54.5", () => {
    expect(round(54.509803921568626, 1)).toBe(54.5);
  });
});
