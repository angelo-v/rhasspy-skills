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
});
