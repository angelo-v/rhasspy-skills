import { AxiosInstance } from "axios";
import { ShoppingList } from "../service";
import { handleError } from "./handleError";

export class TrelloShoppingList implements ShoppingList {
  private readonly id: string;
  private readonly trelloClient: AxiosInstance;

  constructor(id: string, trelloClient: AxiosInstance) {
    this.id = id;
    this.trelloClient = trelloClient;
  }
  async addItem(name: string) {
    try {
      await this.trelloClient.post(
        `/checklists/${this.id}/checkItems`,
        undefined,
        {
          params: { name },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    } catch (err) {
      throw handleError(err);
    }
  }
  getId() {
    return this.id;
  }
}
