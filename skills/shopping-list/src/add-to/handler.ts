import { Handler, RhasspyEvent, RhasspySession } from "../../../../core/src";
import { ShoppingListService } from "../service";

export class AddToShoppingList implements Handler {
  private readonly shoppingListService: ShoppingListService;
  private readonly listName: string;

  constructor(shoppingListService: ShoppingListService, listName: string) {
    this.shoppingListService = shoppingListService;
    this.listName = listName;
  }

  async handle(event: RhasspyEvent, session: RhasspySession) {
    const slot = event.slots.find((it) => it.slotName === "item1");
    if (!slot) {
      return session.say(
        "Ich habe nicht verstanden, was hinzugefügt werden soll.",
        event.siteId
      );
    }
    const shoppingList = await this.shoppingListService.findShoppingList(
      this.listName
    );
    const item = slot.value.value;
    await shoppingList.addItem(item.toString());
    return session.say(`${item} hinzugefügt`, event.siteId);
  }
}
