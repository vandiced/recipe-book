import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../model/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'rb-shopping-list',
    templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {

    items: Ingredient[] = [];
    selectedItem: Ingredient = null;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.items = this.shoppingListService.getItems();
    }

    onSelectItemClick(item: Ingredient) {
        this.selectedItem = item;
    }

    onClearedVar() {
        this.selectedItem = null;
    }

}
