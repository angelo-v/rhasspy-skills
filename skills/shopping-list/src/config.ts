export interface TrelloConfig {
  trelloApiBaseUrl: string;
  trelloBoardId: string;
  shoppingListName: string;
  trelloOauthConsumerKey: string;
  trelloOauthToken: string;
}

export const getConfig = (env: typeof process.env): TrelloConfig => {
  const trelloApiBaseUrl = getRequired(env, "TRELLO_API_BASE_URL");
  const trelloOauthConsumerKey = getRequired(env, "TRELLO_OAUTH_CONSUMER_KEY");
  const trelloOauthToken = getRequired(env, "TRELLO_OAUTH_TOKEN");
  const trelloBoardId = getRequired(env, "SHOPPING_LIST_TRELLO_BOARD_ID");
  const shoppingListName = getRequired(env, "SHOPPING_LIST_TRELLO_CARD_NAME");

  return {
    trelloApiBaseUrl,
    trelloBoardId,
    shoppingListName,
    trelloOauthConsumerKey,
    trelloOauthToken,
  };
};

function getRequired(env: typeof process.env, name: string): string {
  const value = env[name];
  if (!value) {
    throw new Error(`${name} environment variable has to be set`);
  }
  return value;
}
