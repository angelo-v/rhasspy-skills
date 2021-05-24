import axios, { AxiosInstance } from "axios";
import nock from "nock";
import { TrelloShoppingList } from "./TrelloShoppingList";
import { TrelloShoppingListService } from "./TrelloShoppingListService";

describe("TrelloShoppingListService", () => {
  let trelloClient: AxiosInstance;
  beforeEach(() => {
    trelloClient = axios.create({
      baseURL: "https://trello.example",
    });
  });

  it("finds the shopping list", async () => {
    const scope = nock("https://trello.example")
      .get("/boards/board-id/cards?filter=visible")
      .reply(200, [
        {
          id: "1",
          name: "Irrelevant card",
          idChecklists: ["irrelevant-checklist-id"],
        },
        {
          id: "2",
          name: "Shopping list",
          idChecklists: [
            "first-shopping-checklist-id",
            "second-shopping-checklist-id",
          ],
        },
      ]);
    const list = await new TrelloShoppingListService(
      "board-id",
      trelloClient
    ).findShoppingList("Shopping list");
    expect(list).toBeInstanceOf(TrelloShoppingList);
    expect(list.getId()).toEqual("first-shopping-checklist-id");
    scope.done();
  });

  it("throws exception if shopping list card is not present", async () => {
    const scope = nock("https://trello.example")
      .get("/boards/board-id/cards?filter=visible")
      .reply(200, [
        {
          id: "1",
          name: "Irrelevant card",
          idChecklists: ["irrelevant-checklist-id"],
        },
        {
          id: "2",
          name: "No Shopping list",
          idChecklists: ["first-checklist-id"],
        },
      ]);
    await expect(
      new TrelloShoppingListService("board-id", trelloClient).findShoppingList(
        "Shopping list"
      )
    ).rejects.toThrow(
      new Error(
        "Ich konnte keine Trello-Karte mit der Bezeichnung 'Shopping list' finden."
      )
    );
    scope.done();
  });

  it("throws exception if shopping list does not contain a checklist", async () => {
    const scope = nock("https://trello.example")
      .get("/boards/board-id/cards?filter=visible")
      .reply(200, [
        {
          id: "1",
          name: "Irrelevant card",
          idChecklists: ["irrelevant-checklist-id"],
        },
        {
          id: "2",
          name: "Shopping list",
          idChecklists: [],
        },
      ]);
    await expect(
      new TrelloShoppingListService("board-id", trelloClient).findShoppingList(
        "Shopping list"
      )
    ).rejects.toThrow(
      new Error(
        "Die Trello-Karte mit der Bezeichnung 'Shopping list' enthält keine Check-Liste. Bitte lege eine an."
      )
    );
    scope.done();
  });

  it.each([400, 401, 403, 404, 500])(
    "throws exception if trello responds with status %s",
    async (status) => {
      const scope = nock("https://trello.example")
        .get("/boards/board-id/cards?filter=visible")
        .reply(status);
      await expect(
        new TrelloShoppingListService(
          "board-id",
          trelloClient
        ).findShoppingList("Shopping list")
      ).rejects.toThrow(
        new Error(
          `Die Verbindung zu Trello ist fehlgeschlagen. Der Status-Code lautet: ${status}`
        )
      );
      scope.done();
    }
  );

  it("throws exception if network error occurs", async () => {
    const scope = nock("https://trello.example")
      .get("/boards/board-id/cards?filter=visible")
      .replyWithError(new Error("ECONNREFUSED"));
    await expect(
      new TrelloShoppingListService("board-id", trelloClient).findShoppingList(
        "Shopping list"
      )
    ).rejects.toThrow(
      new Error(
        "Die Verbindung zu Trello ist fehlgeschlagen. Möglicherweise gibt es Netzwerkprobleme."
      )
    );
    scope.done();
  });
});
