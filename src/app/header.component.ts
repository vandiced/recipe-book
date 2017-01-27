import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { RecipeService } from './recipes/recipe.service';

@Component({
    selector: 'rb-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private recipeService: RecipeService) { }

    ngOnInit() {
    }

    onStoreRecipes() {
        this.recipeService.storeData().subscribe(
            data => console.log(data),
            error => console.log(error)
        );
    }

    onFetchRecipes() {
        console.log('WTFFFFFF');
        this.recipeService.fetchData();
    }

}
