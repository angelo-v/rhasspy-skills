import { AxiosInstance } from "axios";
import { ShoppingList, ShoppingListService } from "../service";
import { handleError } from "./handleError";
import { TrelloShoppingList } from "./TrelloShoppingList";

interface TrelloCardResponse {
  name: string;
  idChecklists: string[];
}

export class TrelloShoppingListService implements ShoppingListService {
  private boardId: string;
  private readonly trelloClient: AxiosInstance;

  constructor(boardId: string, trelloClient: AxiosInstance) {
    this.boardId = boardId;
    this.trelloClient = trelloClient;
  }

  async findShoppingList(name: string): Promise<ShoppingList> {
    const cards = await this.getVisibleCards();
    const shoppingListCard = cards.find((it) => it.name === name);
    if (!shoppingListCard) {
      throw new Error(
        `Ich konnte keine Trello-Karte mit der Bezeichnung '${name}' finden.`
      );
    }
    const shoppingListId = shoppingListCard.idChecklists[0];
    if (!shoppingListId) {
      throw new Error(
        `Die Trello-Karte mit der Bezeichnung '${name}' enthält keine Check-Liste. Bitte lege eine an.`
      );
    }
    return Promise.resolve(
      new TrelloShoppingList(shoppingListId, this.trelloClient)
    );
  }

  private async getVisibleCards(): Promise<TrelloCardResponse[]> {
    try {
      const response = await this.trelloClient.get(
        `/boards/${this.boardId}/cards`,
        {
          params: { filter: "visible" },
        }
      );
      return response.data;
    } catch (err) {
      throw handleError(err);
    }
  }
}
