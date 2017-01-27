import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Ingredient } from '../model/ingredient';
import { Recipe } from '../model/recipe';

@Injectable()
export class RecipeService {

    recipesChanged = new EventEmitter<Recipe[]>();
    recipes: Recipe[] = [
        new Recipe(
            'Poke',
            'Delicious Poke Bowl!',
            'https://peopledotcom.files.wordpress.com/2016/08/poke-2.jpg',
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

    constructor(private http: Http) { }

    getRecipes(): Recipe[] {
        return this.recipes;
    }

    getRecipe(recipeIndex: number): Recipe {
        return this.recipes[recipeIndex];
    }

    deleteRecipe(recipe: Recipe) {
        // what this does is take the recipes array and remove a part of it,
        // namely the recipe we want to delete
        this.recipes.splice(this.recipes.indexOf(recipe), 1);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
    }

    editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
        this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
    }

    storeData() {
        const body = JSON.stringify(this.recipes);
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.put(
            'https://recipebook-8626b.firebaseio.com/recipes.json',
            body,
            {headers: headers}
        );
    }

    fetchData() {

        return this.http.get('https://recipebook-8626b.firebaseio.com/recipes.json')
            .map(
                (response: Response) => {
                    console.log(response);
                    return response.json();
                }
            )
            .subscribe(
                (data: Recipe[]) => {
                    this.recipes = data;
                    this.recipesChanged.emit(this.recipes);
                }
            );
    }
}
