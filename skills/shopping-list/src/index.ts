import {skill} from "../../../core/src/mqtt";
import {createAddToShoppingListHandler} from "./createAddToShoppingListHandler";


skill(['AddToShoppingList'], createAddToShoppingListHandler());