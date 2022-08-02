import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesModule } from '../categories/categories.module';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    SharedModule,
    SearchRoutingModule,
    CategoriesModule
  ]
})
export class SearchModule { }
