import { Injectable } from '@angular/core';

import { Ingredient } from '../model/ingredient';

@Injectable()
export class ShoppingListService {

    private items: Ingredient[] = [];

    constructor() { }

    getItems() {
        return this.items;
    }

    addItem(item: Ingredient) {
        this.items.push(item);
    }

    addItems(items: Ingredient[]) {
        // cannot use push to add MULTIPLE items to an array
        // push can only be used to add individual 'item'(s)
        //this.items.push(items);

        // what i can use is - 'apply this push method available on each
        // array object to all the items i specified in 'items' will get
        // pushed in to the first argument this.items'
        // HOWEVER i couldve also used a forloop to loop through all the 
        // items and push each item in items into this.items
        Array.prototype.push.apply(this.items, items);
    }

    editItem(oldItem: Ingredient, newItem: Ingredient) {
        this.items[this.items.indexOf(oldItem)] = newItem;
    }

    deleteItem(item: Ingredient) {
        this.items.splice(this.items.indexOf(item), 1);
    }

}
