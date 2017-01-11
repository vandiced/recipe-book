import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {

    private isOpen = false;

    // bind css class open will only be appended (or added to the hosting elemnt)
    // if this property returns true
    @HostBinding('class.open') get opened() {
        return this.isOpen;
    }

    // @HostListener('click') open() {
    //     this.isOpen = true;
    //}

    @HostListener('mouseenter') open() {
        this.isOpen = true;
    }

    @HostListener('mouseleave') close() {
        this.isOpen = false;
    }

  constructor() { }

}
