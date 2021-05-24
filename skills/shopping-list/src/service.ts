export interface ShoppingList {
    getId: () => string
    addItem: (name: string) => Promise<void>
}

export interface ShoppingListService {
    findShoppingList: (name: string) => Promise<ShoppingList>
}