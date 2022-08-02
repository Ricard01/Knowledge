import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ArticlesTitlesVm } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl = environment.apiUrl + 'articles/search/';

  constructor(private http: HttpClient) { }

  searchTitles(params: HttpParams) {
    return this.http.get<ArticlesTitlesVm>(this.baseUrl + 'titlesByTerm', { params }).pipe(map(resp => resp.articles));    
  }

  searchArticles(params: HttpParams) {
    return this.http.get(this.baseUrl, {params});
  }

}
