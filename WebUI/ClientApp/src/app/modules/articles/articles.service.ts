import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleDto, CreateArticleCommand, PaginatedListOfArticleDto, UpdateArticleCommand } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl = environment.apiUrl + 'articles/';

  constructor(private http: HttpClient) { }

  getArticle(id: number): Observable<ArticleDto> {  
    return this.http.get<ArticleDto>(`${this.baseUrl}${id}`);
  }

  getArticles(params: HttpParams): Observable<PaginatedListOfArticleDto> {
    return this.http.get(this.baseUrl, { params });
  }

  getArticlesByCategory(params: HttpParams): Observable<PaginatedListOfArticleDto> {
    return this.http.get(this.baseUrl + 'category', { params });
  }

  create(article: CreateArticleCommand) {
    return this.http.post<CreateArticleCommand>(this.baseUrl, article);
  }

  update(article: UpdateArticleCommand) {
    return this.http.put<UpdateArticleCommand>(this.baseUrl + article.id, article)
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + id);
  }


}

