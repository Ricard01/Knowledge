import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoriesVm, CreateCategoryCommand, UpdateCategoryCommand } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl = environment.apiUrl + 'categories/'

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<CategoriesVm>(this.baseUrl);
  }

  create(category: CreateCategoryCommand) {
    return this.http.post<CreateCategoryCommand>(this.baseUrl, category);
  }

  update(category: UpdateCategoryCommand) {
    return this.http.put<UpdateCategoryCommand>(this.baseUrl + category.id, category);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + id);
  }


}
