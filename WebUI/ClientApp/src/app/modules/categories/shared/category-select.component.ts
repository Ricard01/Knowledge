import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryDto } from 'src/app/models';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-category-select',
  template: `

<form  [formGroup]="form"> 

<!-- With this ngif i dont have to use in the parent component so only makes one call to the api in Aricles-SearchComponent -->

  <div *ngIf="showSelect;">

    <mat-form-field  appearance="fill">

      <mat-label>Category</mat-label>

      <mat-select formControlName="id"  (selectionChange)="onCategorySelected($event.value)">
        <mat-option value=0>All</mat-option>
        <mat-option [value]="category.id" *ngFor="let category of this.categoriesOptions">{{ category.name }}
        </mat-option>
      </mat-select>

    </mat-form-field>

  </div>

 
</form>

  `,
  styles: [`
.mat-form-field{    
      width: 100%;
      font-size: 14px !important;
  }
  ` ]
})
export class CategorySelectComponent implements OnInit {

  @Input() showSelect: boolean = true;

  @Output() categoryIdEvent = new EventEmitter<number>();

  form: FormGroup;

  categoriesOptions: CategoryDto[];

  constructor(private categoriesService: CategoriesService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: ['0']
    })

    this.getCategories();
  }


  getCategories() {

    this.categoriesService.getCategories().subscribe(resp => {

      this.categoriesOptions = resp.categories;

    });

  }


  onCategorySelected(categoryId: number) {
    this.categoryIdEvent.emit(categoryId);
  }




}
