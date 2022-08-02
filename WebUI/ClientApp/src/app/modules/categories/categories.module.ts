import { NgModule } from '@angular/core';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { CategorySelectComponent } from './shared/category-select.component';
import { CategoryAutocompleteComponent } from './shared/category-autocomplete.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryComponent,
    CategoryAutocompleteComponent,
    CategorySelectComponent,
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule,
  ],

  exports: [
    CategoryAutocompleteComponent,
    CategorySelectComponent
  ]
})
export class CategoriesModule { }
