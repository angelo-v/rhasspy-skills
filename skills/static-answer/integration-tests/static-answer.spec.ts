import { StaticAnswerHandler } from "../src/handler";

describe("static answer handler", () => {
  it("responds with the given answer", async () => {
    const session = {
      say: jest.fn(),
    };
    await new StaticAnswerHandler().handle(
        {
            input: "wie lautet die antwort",
            intent: { intentName: "StaticAnswer", confidenceScore: 1 },
            siteId: "default",
            id: "97556fcf-f56d-49bb-8d46-97207c1333cf",
            slots: [
                {
                    entity: "answer",
                    value: { kind: "Unknown", value: "die antwort lautet 42" },
                    slotName: "answer",
                    rawValue: "",
                    confidence: 1,
                    range: { start: 8, end: 13, rawStart: 8, rawEnd: 13 },
                },
            ],
            sessionId: "97556fcf-f56d-49bb-8d46-97207c1333cf",
            customData: null,
            asrTokens: [],
            asrConfidence: null,
            rawInput: "wie lautet die antwort",
            wakewordId: null,
            lang: null,
        },
      session
    );
    expect(session.say).toHaveBeenCalledWith(
      expect.stringMatching("die antwort lautet 42")
    );
  });
});
