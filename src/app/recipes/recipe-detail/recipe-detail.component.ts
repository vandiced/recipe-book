import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../model/recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
	selector: 'rb-recipe-detail',
	templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {

	@Input() selectedRecipe: Recipe;

	constructor(private shoppingListService: ShoppingListService) { }

	ngOnInit() {
	}

    onAddToShoppingList() {
        console.log('clicked onAddToShoppingList');
        this.shoppingListService.addItems(this.selectedRecipe.ingredients);
    }

}
