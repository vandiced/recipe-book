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

    getRecipes() {
        return this.recipes;
    }

}
