import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../model/recipe';

@Component({
	selector: 'rb-recipe-item',
	templateUrl: './recipe-item.component.html'
})
export class RecipeItemComponent implements OnInit {

	// @Input() tells the property will be set from OUTSIDE
	// and from where outside? from recipd-list, of course
	@Input() recipe: Recipe;
    // old way
	//recipeId: number;
    // new way: we want to assign recipeId from outside, make it an input
    @Input() recipeId: number;

	constructor() { }

	ngOnInit() {
	}

}
