import { nowIn } from "./nowIn";

import { now } from "./now";

jest.mock("./now");

describe("now in", () => {
  it("Japan is 9 hours behind UTC", () => {
    (now as jest.Mock).mockReturnValue(
      new Date(Date.UTC(2022, 0, 26, 19, 30, 40))
    );
    const result = nowIn("Asia/Tokyo");
    expect(result.hour).toBe(4);
    expect(result.minute).toBe(30);
    expect(result.second).toBe(40);

    expect(result.day).toBe(27);
    expect(result.month).toBe(1);
    expect(result.year).toBe(2022);
    //expect(result).toBe("27.1.2022, 04:30:40");
  });
});
