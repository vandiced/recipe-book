import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from './shopping-list.service';

import { Ingredient } from '../model/ingredient';

@Component({
    selector: 'rb-shopping-list-add',
    templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnInit, OnChanges {

    @Input() item: Ingredient;
    @Output() clearedVar = new EventEmitter();
    isAdd: boolean = true;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        //console.log(form);
        //console.log(form.value);

        const newItem = new Ingredient(form.value.name, form.value.amount);

        if (this.isAdd) {
            
            this.item = newItem;
            this.shoppingListService.addItem(newItem);

        } else {

            this.shoppingListService.editItem(this.item, newItem);
            this.onClear();

        }
    }

    // this is to see changes on any properties passed from the outside
    // aka the @Input properties defined above
    ngOnChanges(changes) {
        // if at change value at initial state (is null) - this means
        // that user is NOT selecting item from the list because the item
        // is null - user is trying to add
        if (changes.item.currentValue === null) {
            this.isAdd = true;
            this.item = {name: null, amount: null};
        } else {
            this.isAdd = false;
        }
    }

    onDelete() {
        this.shoppingListService.deleteItem(this.item);
        this.onClear();
    }

    onClear() {
        //this.item = {name: null, amount: null};
        this.isAdd = true;
        this.clearedVar.emit(null);
    }

}
