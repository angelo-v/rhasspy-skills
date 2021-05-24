import axios, {AxiosInstance} from "axios";
import {Handler} from "../../../core/src";
import {AddToShoppingList} from "./add-to/handler";
import {getConfig} from "./config";
import {TrelloShoppingListService} from "./trello";

const config = getConfig(process.env);

const trelloClient: AxiosInstance = axios.create({
    baseURL: config.trelloApiBaseUrl,
    headers: {
        Authorization: `OAuth oauth_consumer_key="${config.trelloOauthConsumerKey}", oauth_token="${config.trelloOauthToken}"`,
    },
});

export const createAddToShoppingListHandler = (): Handler => {
    const shoppingListService = new TrelloShoppingListService(
        config.trelloBoardId,
        trelloClient
    );
    return new AddToShoppingList(shoppingListService, config.shoppingListName);
};
