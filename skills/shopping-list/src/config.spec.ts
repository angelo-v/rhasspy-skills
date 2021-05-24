import { getConfig, TrelloConfig } from "./config";

describe("get config", () => {
  describe("valid configuration", () => {
    let config: TrelloConfig;
    beforeEach(() => {
      config = getConfig({
        TRELLO_API_BASE_URL: "https://trello.example/api",
        SHOPPING_LIST_TRELLO_BOARD_ID: "123",
        SHOPPING_LIST_TRELLO_CARD_NAME: "Shopping List",
        TRELLO_OAUTH_CONSUMER_KEY: "consumer-key",
        TRELLO_OAUTH_TOKEN: "token",
      });
    });

    it("gets trello base api from env", () => {
      expect(config.trelloApiBaseUrl).toEqual("https://trello.example/api");
    });
    it("gets trello board id from env", () => {
      expect(config.trelloBoardId).toEqual("123");
    });
    it("gets shopping list name from env", () => {
      expect(config.shoppingListName).toEqual("Shopping List");
    });
    it("gets consumer key from env", () => {
      expect(config.trelloOauthConsumerKey).toEqual("consumer-key");
    });
    it("gets oauth token from env", () => {
      expect(config.trelloOauthToken).toEqual("token");
    });
  });

  describe("missing configuration values", () => {
    it("throws exception when TRELLO_API_BASE_URL is missing", () => {
      expect(() =>
        getConfig({
          SHOPPING_LIST_TRELLO_BOARD_ID: "123",
          SHOPPING_LIST_TRELLO_CARD_NAME: "Shopping List",
          TRELLO_OAUTH_CONSUMER_KEY: "consumer-key",
          TRELLO_OAUTH_TOKEN: "token",
        })
      ).toThrow("TRELLO_API_BASE_URL environment variable has to be set");
    });
    it("throws exception when SHOPPING_LIST_TRELLO_BOARD_ID is missing", () => {
      expect(() =>
        getConfig({
          TRELLO_API_BASE_URL: "https://trello.example/api",
          SHOPPING_LIST_TRELLO_CARD_NAME: "Shopping List",
          TRELLO_OAUTH_CONSUMER_KEY: "consumer-key",
          TRELLO_OAUTH_TOKEN: "token",
        })
      ).toThrow(
        "SHOPPING_LIST_TRELLO_BOARD_ID environment variable has to be set"
      );
    });
    it("throws exception when SHOPPING_LIST_TRELLO_CARD_NAME is missing", () => {
      expect(() =>
        getConfig({
          TRELLO_API_BASE_URL: "https://trello.example/api",
          SHOPPING_LIST_TRELLO_BOARD_ID: "123",
          TRELLO_OAUTH_CONSUMER_KEY: "consumer-key",
          TRELLO_OAUTH_TOKEN: "token",
        })
      ).toThrow(
        "SHOPPING_LIST_TRELLO_CARD_NAME environment variable has to be set"
      );
    });
    it("throws exception when TRELLO_OAUTH_CONSUMER_KEY is missing", () => {
      expect(() =>
        getConfig({
          TRELLO_API_BASE_URL: "https://trello.example/api",
          SHOPPING_LIST_TRELLO_BOARD_ID: "123",
          SHOPPING_LIST_TRELLO_CARD_NAME: "Shopping List",
          TRELLO_OAUTH_TOKEN: "token",
        })
      ).toThrow("TRELLO_OAUTH_CONSUMER_KEY environment variable has to be set");
    });
    it("throws exception when TRELLO_OAUTH_TOKEN is missing", () => {
      expect(() =>
        getConfig({
          TRELLO_API_BASE_URL: "https://trello.example/api",
          SHOPPING_LIST_TRELLO_BOARD_ID: "123",
          SHOPPING_LIST_TRELLO_CARD_NAME: "Shopping List",
          TRELLO_OAUTH_CONSUMER_KEY: "consumer-key",
        })
      ).toThrow("TRELLO_OAUTH_TOKEN environment variable has to be set");
    });
  });
});
