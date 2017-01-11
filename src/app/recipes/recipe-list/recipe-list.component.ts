import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../../model/recipe';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'rb-recipe-list',
	templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {

	recipes: Recipe[] = [];
	//recipe = new Recipe('Dummy', 'Dummy', 'https://yt3.ggpht.com/-tpPJuK2c8QA/AAAAAAAAAAI/AAAAAAAAAAA/b_tq0T0lyFI/s900-c-k-no-mo-rj-c0xffffff/photo.jpg');
	@Output() recipeSelected = new EventEmitter<Recipe>();

	constructor(private recipeService: RecipeService) { }

	// do service initializations here because they will be fully
	// loaded once this method is called - this is a best practice
	// so do NOT do it in the constructor. leave simpler stuff
	// for the constructor but not where services are concerned
	ngOnInit() {
		this.recipes = this.recipeService.getRecipes();
	}

	onSelected(recipe: Recipe) {
		this.recipeSelected.emit(recipe);

	}

}
