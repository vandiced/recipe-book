import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { 
    FormArray, 
    FormBuilder, 
    FormControl, 
    FormGroup, 
    Validators 
} from '@angular/forms';

import { RecipeService } from '../recipe.service';

import { Recipe } from '../../model/recipe';

@Component({
    selector: 'rb-recipe-edit',
    templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private recipeIndex: number;
    private recipe: Recipe;
    private isNew: boolean = true;
    recipeForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    private initForm() {
        let recipeName = '';
        let recipeImageUrl = '';
        let recipeContent = '';
        let recipeIngredients: FormArray = new FormArray([]);

        if (!this.isNew) {

            // need to test first that ingredients array is defined
            //if (typeof this.recipe.ingredients !== 'undefined') {
            // dont do above, do this instead:
            if (this.recipe.hasOwnProperty('ingredients')) {
                for (let i=0; i<this.recipe.ingredients.length; i++) {
                    recipeIngredients.push(
                        new FormGroup({
                            name: new FormControl(
                                this.recipe.ingredients[i].name,
                                Validators.required
                            ),
                            amount: new FormControl(
                                this.recipe.ingredients[i].amount,
                                [Validators.required, Validators.pattern("\\d+")]
                            )
                        })
                    )
                }
            }

            recipeName = this.recipe.name;
            recipeImageUrl = this.recipe.imagePath;
            recipeContent = this.recipe.description;
        }

        this.recipeForm = this.formBuilder.group({
            name: [recipeName, Validators.required],
            imagePath: [recipeImageUrl, Validators.required],
            description: [recipeContent, Validators.required],
            ingredients: recipeIngredients
        });
    }

    ngOnInit() {
        // is this a new recipe or a new one?
        this.subscription = this.route.params.subscribe(
            // extract the id from the route and type cast
            // the string to number
            (params: any) => {

                // if id exists in the parameters, then this is an
                // edit recipe NOT add recipe
                if (params.hasOwnProperty('id')) {
                    this.isNew = false;
                    this.recipeIndex = +params['id'];
                    this.recipe = this.recipeService.getRecipe(this.recipeIndex);
                } else {
                    this.isNew = true;
                    this.recipeIndex = null;
                }

                console.log(this.isNew);
                this.initForm();
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        const newRecipe = this.recipeForm.value;
        console.log(newRecipe);

        if (this.isNew) {
            this.recipeService.addRecipe(newRecipe);
        } else {
            this.recipeService.editRecipe(this.recipe, newRecipe);
        }

        this.navigateBack();
    }

    onCancel() {
        this.navigateBack();
    }

    onAddItem(name: string, amount: string) {
        (<FormArray>this.recipeForm.controls['ingredients']).push(
            new FormGroup({
                name: new FormControl(name, Validators.required),
                amount: new FormControl(amount, [
                    Validators.required, 
                    Validators.pattern("\\d+")
                ])
            })
        );
    }

    onRemoveItem(index: number) {
        (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
    }

    private navigateBack() {
        this.router.navigate(['../']);
    }

}
