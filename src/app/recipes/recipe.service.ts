import { Injectable } from '@angular/core';

import { Ingredient } from '../model/ingredient';
import { Recipe } from '../model/recipe';

@Injectable()
export class RecipeService {

    recipes: Recipe[] = [
        new Recipe(
            'Poke',
            'Delicious Poke Bowl!',
            'http://www.howsweeteats.com/wp-content/uploads/2016/02/poke-bowl-I-howsweeteats.com-10.jpg',
            [
                new Ingredient('Tuna', 1),
                new Ingredient('Chili Paste', 1)
            ]
        ),
        new Recipe(
            'Tijuana Tacos',
            'Tijuana Tacos from the hell hole known as Tijuana!',
            'http://tijuanas-tacos.com/wp-content/uploads/2013/10/Tijuana-Taco.jpg',
            [
                new Ingredient('Marinated Pork', 1),
                new Ingredient('Corn Tortilla', 1)
            ]
        )
    ];

    constructor() { }

    getRecipes(): Recipe[] {
        return this.recipes;
    }

    getRecipe(recipeIndex: number): Recipe {
        return this.recipes[recipeIndex];
    }

    deleteRecipe(recipe: Recipe) {
        // what this does is take the recipes array and remove a part of it,
        // namely the recipe we want to delete
        this.recipes.splice(this.recipes.indexOf(recipe), )
    }

}
