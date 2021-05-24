import { RhasspyEvent, RhasspySession } from "../../../../core/src";
import { ShoppingList, ShoppingListService } from "../service";
import { AddToShoppingList } from "./handler";

describe("add to shopping list handler", () => {
  describe("when successful", () => {
    let shoppingList: ShoppingList;
    let shoppingListService: ShoppingListService;
    let session: RhasspySession;

    beforeEach(async () => {
      session = {
        say: jest.fn(),
      };
      shoppingListService = {
        findShoppingList: jest.fn(),
      };
      shoppingList = {
        getId: () => "",
        addItem: jest.fn(),
      };
      (shoppingListService.findShoppingList as jest.Mock).mockResolvedValue(
        shoppingList
      );
      await new AddToShoppingList(shoppingListService, "Einkaufen").handle(
        {
          slots: [
            {
              value: { value: "obst" },
              slotName: "item1",
            },
          ],
        } as unknown as RhasspyEvent,
        session
      );
    });
    it("tells, what has been added", () => {
      expect(session.say).toHaveBeenCalledWith("obst hinzugefügt");
    });
    it("added item to shopping list", () => {
      expect(shoppingList.addItem).toHaveBeenCalledWith("obst");
    });
    it("searched for correct shopping list", () => {
      expect(shoppingListService.findShoppingList).toHaveBeenCalledWith(
        "Einkaufen"
      );
    });
  });

  describe("fails", () => {
    it("when no item slot is given", async () => {
      const event = {
        slots:  [],
      } as unknown as RhasspyEvent;
      const session = {
        say: jest.fn(),
      };
      await new AddToShoppingList(
        {} as ShoppingListService,
        "Einkaufen"
      ).handle(
        event,
        session
      );
      expect(session.say).toHaveBeenCalledWith(
        "Ich habe nicht verstanden, was hinzugefügt werden soll."
      );
    });
  });
});
