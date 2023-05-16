import nock from "nock";
import { AddToShoppingList } from "../src/add-to/handler";
import { createAddToShoppingListHandler } from "../src/createAddToShoppingListHandler";

describe("add to shopping list intent handler", () => {
  it("should find the shopping list trello card and add the item to the first checklist", async () => {
    const session = {
      say: jest.fn(),
    };
    const scope = nock("https://api.trello.com/1")
      .get("/boards/the-board-id/cards?filter=visible")
      .matchHeader(
        "Authorization",
        'OAuth oauth_consumer_key="the-consumer-key", oauth_token="the-token"'
      )
      .reply(200, [
        {
          id: "1",
          name: "Irrelevant card",
          idChecklists: ["irrelevant-checklist-id"],
        },
        {
          id: "2",
          name: "Shopping List",
          idChecklists: [
            "first-shopping-checklist-id",
            "second-shopping-checklist-id",
          ],
        },
      ])
      .post(
        "/checklists/first-shopping-checklist-id/checkItems?name=%C3%A4pfel"
      )
      .matchHeader("Content-Type", "application/x-www-form-urlencoded")
      .reply(200, {
        idChecklist: "first-shopping-checklist-id",
        state: "incomplete",
        id: "item-id",
        name: "äpfel",
        nameData: {
          emoji: {},
        },
        pos: 2064384,
        due: null,
        idMember: null,
        limits: {},
      });
    const handler = createAddToShoppingListHandler();
    await handler.handle(
      {
        input: "Schreib äpfel auf die Einkaufsliste",
        intent: { intentName: "AddToShoppingList", confidenceScore: 1 },
        siteId: "site-id-01",
        id: "97556fcf-f56d-49bb-8d46-97207c1333cf",
        slots: [
          {
            entity: "item1",
            value: { kind: "Unknown", value: "äpfel" },
            slotName: "item1",
            rawValue: "äpfel",
            confidence: 1,
            range: { start: 8, end: 13, rawStart: 8, rawEnd: 13 },
          },
        ],
        sessionId: "97556fcf-f56d-49bb-8d46-97207c1333cf",
        customData: null,
        asrTokens: [],
        asrConfidence: null,
        rawInput: "schreib äpfel auf die Einkaufsliste",
        wakewordId: null,
        lang: null,
      },
      session
    );
    expect(session.say).toHaveBeenCalledWith("äpfel hinzugefügt", "site-id-01");
    scope.done();
  });
});
