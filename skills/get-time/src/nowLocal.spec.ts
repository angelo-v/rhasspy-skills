import { now } from "./now";
import { nowLocal } from "./nowLocal";

jest.mock("./now");

describe("now in local time zone", () => {
  it("returns a date time object", () => {
    (now as jest.Mock).mockReturnValue(
      new Date(Date.UTC(2022, 0, 26, 19, 30, 40))
    );
    const result = nowLocal();
    expect(result.hour).toBe(19);
    expect(result.minute).toBe(30);
    expect(result.second).toBe(40);

    expect(result.day).toBe(26);
    expect(result.month).toBe(1);
    expect(result.year).toBe(2022);
  });
});
