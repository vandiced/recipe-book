import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Recipe } from '../../model/recipe';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
	selector: 'rb-recipe-detail',
	templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private recipeIndex: number;
    selectedRecipe: Recipe;

	constructor(
        private shoppingListService: ShoppingListService,
        private route: ActivatedRoute,
        private recipeService: RecipeService,
        private router: Router
    ) { }

	ngOnInit() {
        // we need to set up a subscription to the parameters of
        // activated route
        this.subscription = this.route.params.subscribe(
            (params: any) => {
                this.recipeIndex = params['id'];
                this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
            }
        );

        //this.recipeService.recipesChanged.subscribe(
        //    (recipes: Recipe[]) => this.recipes = recipes
        //);
        this.recipeService.recipesChanged.subscribe(
            (recipes: Recipe[]) => this.selectedRecipe = recipes[this.recipeIndex]
        );
	}

    onAddToShoppingList() {
        console.log('clicked onAddToShoppingList');
        this.shoppingListService.addItems(this.selectedRecipe.ingredients);
    }

    onEdit() {
        this.router.navigate(['recipes/', this.recipeIndex, 'edit']);
    }

    onDelete() {
        this.recipeService.deleteRecipe(this.selectedRecipe);
        this.router.navigate(['/recipes']);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
