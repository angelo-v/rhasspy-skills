import nock from "nock";
import { createGetCurrentWeatherHandler } from "../src/createGetCurrentWeatherHandler";

import wttrInResponse from "./wttr.in.json";

describe("when asked for the current weather conditions in hamburg", () => {
  it("describes the current weather in one sentence", async () => {
    const session = {
      say: jest.fn(),
    };
    const scope = nock("https://wttr.in")
      .get("/Hamburg?format=j1&lang=de")
      .reply(200, wttrInResponse);
    const handler = createGetCurrentWeatherHandler();
    await handler.handle(
      {
        input: "wie ist das wetter in hamburg",
        intent: { intentName: "GetCurrentWeather", confidenceScore: 1 },
        siteId: "site-id-01",
        id: "97556fcf-f56d-49bb-8d46-97207c1333cf",
        slots: [
          {
            entity: "locality",
            value: { kind: "Unknown", value: "Hamburg" },
            slotName: "locality",
            rawValue: "Hamburg",
            confidence: 1,
            range: { start: 8, end: 13, rawStart: 8, rawEnd: 13 },
          },
        ],
        sessionId: "97556fcf-f56d-49bb-8d46-97207c1333cf",
        customData: null,
        asrTokens: [],
        asrConfidence: null,
        rawInput: "wie ist das wetter in hamburg",
        wakewordId: null,
        lang: null,
      },
      session
    );
    expect(session.say).toHaveBeenCalledWith(
      "In Hamburg sind es aktuell 18 Grad. Es ist Nebel.",
      "site-id-01"
    );
    scope.done();
  });
});
