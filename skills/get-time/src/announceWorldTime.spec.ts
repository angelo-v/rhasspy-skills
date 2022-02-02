import { announceWorldTime } from "./announceWorldTime";
import { now } from "./now";
import { nowIn } from "./nowIn";
import { nowLocal } from "./nowLocal";

jest.mock("./now");

describe("announce world time", () => {
  describe("when asked location is on the same date", () => {
    it("converts the date time to a humane time announcement", () => {
      (now as jest.Mock).mockReturnValue(
        new Date(Date.UTC(2022, 0, 26, 19, 30, 40))
      );
      const result = announceWorldTime(
        "Berlin",
        nowLocal(),
        nowIn("Europe/Berlin")
      );
      expect(result).toBe("In Berlin ist es jetzt 20 Uhr 30!");
    });
  });

  describe("when asked location is on the next day already", () => {
    it("then announcement makes aware of that", () => {
      (now as jest.Mock).mockReturnValue(
        new Date(Date.UTC(2022, 0, 26, 23, 30, 40))
      );
      const result = announceWorldTime(
        "Berlin",
        nowLocal(),
        nowIn("Europe/Berlin")
      );
      expect(result).toBe("In Berlin ist es bereits 0 Uhr 30 am nächsten Tag!");
    });
    it("then announcement makes aware of that, even if the month changed", () => {
      (now as jest.Mock).mockReturnValue(
        new Date(Date.UTC(2022, 0, 31, 23, 30, 40))
      );
      const result = announceWorldTime(
        "Berlin",
        nowLocal(),
        nowIn("Europe/Berlin")
      );
      expect(result).toBe("In Berlin ist es bereits 0 Uhr 30 am nächsten Tag!");
    });
    it("then announcement makes aware of that, even if the year changed", () => {
      (now as jest.Mock).mockReturnValue(
        new Date(Date.UTC(2022, 11, 31, 23, 30, 40))
      );
      const result = announceWorldTime(
        "Berlin",
        nowLocal(),
        nowIn("Europe/Berlin")
      );
      expect(result).toBe("In Berlin ist es bereits 0 Uhr 30 am nächsten Tag!");
    });
  });
});
