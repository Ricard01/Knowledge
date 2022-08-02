import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateTagCommand, TagsCategoryVm, TagsVm, UpdateTagCommand } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  baseUrl = environment.apiUrl + 'tags/'

  constructor(private http: HttpClient) { }

  getTags() {
    return this.http.get<TagsVm>(this.baseUrl);
  }

  getTagsByCategory(categoryId: number) {
    return this.http.get<TagsCategoryVm>(this.baseUrl + 'Category/' + categoryId);
  }

  create(tag: CreateTagCommand) {
    return this.http.post<CreateTagCommand>(this.baseUrl, tag);
  }

  update(tag: UpdateTagCommand) {
    return this.http.put<UpdateTagCommand>(this.baseUrl + tag.id, tag)
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

}
