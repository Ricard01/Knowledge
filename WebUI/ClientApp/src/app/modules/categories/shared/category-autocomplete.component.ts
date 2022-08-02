import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoryDto } from 'src/app/models';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-category-autocomplete',
  template: `

  <form autocomplete="off" [formGroup]="form">
  <mat-form-field>
            <mat-label>Category</mat-label>
   
            <input type="search" aria-label="Number" placeholder="Select a Category" matInput formControlName="categoryName"
                [matAutocomplete]="auto">
 
            <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayCategory"  (optionSelected)="onCategorySelected($event.option.value)">

                <mat-option *ngFor="let category of filteredOptions | async " [value]="category">
                    {{category?.name }}
                </mat-option>

            </mat-autocomplete>

            <mat-error *ngIf="form.controls.categoryName?.errors?.matchRequired">
                Please select a Category from the list
            </mat-error>

  </mat-form-field>

</form>


  `,
  styles: [`
  .mat-form-field{
width: 100%;
}
  `
    
  ]
})
export class CategoryAutocompleteComponent implements OnInit {

  @Input() formGroupName: string;

  @Output() categoryIdEvent = new EventEmitter<number>();

  form: FormGroup;

  categoriesOptions: CategoryDto[];

  filteredOptions: Observable<CategoryDto[]>;

  constructor(private rootFormGroup: FormGroupDirective, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;

    this.getCategories();
  }


  getCategories() {

    this.categoryService.getCategories().subscribe(resp => {

      this.categoriesOptions = resp.categories;

      this.filteredOptions = this.form.get("categoryName").valueChanges
        .pipe(
          startWith(''),

          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.categoriesOptions.slice())
        );

    });
  }


  private _filter(name: string): CategoryDto[] {

    const filterValue = name.toLowerCase();
    return this.categoriesOptions.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayCategory(category: CategoryDto): string | undefined {
    return category ? category.name : undefined;
  }

  onCategorySelected(category: CategoryDto) {
    this.categoryIdEvent.emit(category.id);
  }


}
