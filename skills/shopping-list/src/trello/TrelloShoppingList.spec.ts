import axios, { AxiosInstance } from "axios";
import nock from "nock";
import { TrelloShoppingList } from "./TrelloShoppingList";

describe("trello shopping list", () => {
  let trelloClient: AxiosInstance;
  beforeEach(() => {
    trelloClient = axios.create({
      baseURL: "https://trello.example",
    });
  });

  describe("when item is added successfully", () => {
    it("a POST request is made to the checklist", async () => {
      const scope = nock("https://trello.example")
        .post("/checklists/checklist-id/checkItems?name=new%20item")
        .reply(200, {
          idChecklist: "checklist-id",
          state: "incomplete",
          id: "item-id",
          name: "test",
          nameData: {
            emoji: {},
          },
          pos: 2064384,
          due: null,
          idMember: null,
          limits: {},
        });
      await new TrelloShoppingList("checklist-id", trelloClient).addItem(
        "new item"
      );
      scope.done();
    });
  });

  it.each([400, 401, 403, 404, 500])(
    "throws exception if trello responds with status %s",
    async (status) => {
      const scope = nock("https://trello.example")
        .post("/checklists/checklist-id/checkItems?name=new%20item")
        .reply(status);
      await expect(
        new TrelloShoppingList("checklist-id", trelloClient).addItem("new item")
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
      .post("/checklists/checklist-id/checkItems?name=new%20item")
      .replyWithError(new Error("ECONNREFUSED"));
    await expect(
      new TrelloShoppingList("checklist-id", trelloClient).addItem("new item")
    ).rejects.toThrow(
      new Error(
        "Die Verbindung zu Trello ist fehlgeschlagen. Möglicherweise gibt es Netzwerkprobleme."
      )
    );
    scope.done();
  });
});
