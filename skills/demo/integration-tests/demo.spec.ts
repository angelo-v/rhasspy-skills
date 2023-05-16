import { DemoHandler } from "../src/handler";

describe("demo handler", () => {
  it("outputs the raw input", async () => {
    const session = {
      say: jest.fn(),
    };
    await new DemoHandler().handle(
      {
        input: "hallo echo",
        intent: { intentName: "Demo", confidenceScore: 1 },
        siteId: "site-id-01",
        id: "10225110-63c6-499b-8423-e14096c4efcf",
        slots: [],
        sessionId: "10225110-63c6-499b-8423-e14096c4efcf",
        customData: null,
        asrTokens: [],
        asrConfidence: null,
        rawInput: "hallo echo",
        wakewordId: null,
        lang: null,
      },
      session
    );
    expect(session.say).toHaveBeenCalledWith(
      expect.stringMatching("hallo echo"),
      "site-id-01"
    );
  });
});
