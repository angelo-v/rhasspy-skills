import { announceTime } from "./announceTime";

describe("announce time", () => {
  it.each([
    [0, "Es ist 15 Uhr 37!"],
    [0.24, "Es ist 15 Uhr 37!"],
    [0.25, "15 Uhr 37!"],
    [0.49, "15 Uhr 37!"],
    [0.5, "Wir haben 15 Uhr 37!"],
    [0.74, "Wir haben 15 Uhr 37!"],
    [0.75, "Genau 15 Uhr und 37 Minuten!"],
    [0.99, "Genau 15 Uhr und 37 Minuten!"],
  ])(
    "converts a Date to a varying humane time announcement",
    (variation: number, sentence: string) => {
      const result = announceTime(
        {
          hour: 15,
          minute: 37,
        } as DateTime,
        variation
      );
      expect(result).toEqual(sentence);
    }
  );
});
