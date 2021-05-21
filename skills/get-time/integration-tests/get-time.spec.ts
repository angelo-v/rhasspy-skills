import { GetCurrentTime } from "../src/handler";
import { now } from "../src/now";

jest.mock("../src/now");

describe("Get current time", () => {
  it("announces the current time", async () => {
    (now as jest.Mock).mockReturnValue(new Date("2021-01-01 15:37"));
    const session = {
      say: jest.fn(),
    };
    await new GetCurrentTime().handle(
      {
        input: "wie spät ist es",
        intent: { intentName: "GetTime", confidenceScore: 1 },
        siteId: "default",
        id: "10225110-63c6-499b-8423-e14096c4efcf",
        slots: [],
        sessionId: "10225110-63c6-499b-8423-e14096c4efcf",
        customData: null,
        asrTokens: [],
        asrConfidence: null,
        rawInput: "wie spät ist es",
        wakewordId: null,
        lang: null,
      },
      session
    );
    expect(session.say).toHaveBeenCalledWith(
      expect.stringMatching(/.*15.*37.*/)
    );
  });
});
