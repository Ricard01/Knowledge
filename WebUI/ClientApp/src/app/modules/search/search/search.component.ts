import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable, map, filter, debounceTime, switchMap, of } from 'rxjs';
import { ArticleDto, ArticleTitleDto, PaginatedListOfArticleDto } from 'src/app/models';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // KeyUp vs ValueChanges if someone enters a value without the keyboard, e.g. pasting something with right click -> paste? I would go for valueChanges

  // There is room to improve because if for example there is al ready a term and the users press enter it wall make antoher call to the api eveen if the term is the same
  formSearch: FormGroup;

  articlesItems: ArticleDto[];
  titles: ArticleTitleDto[]
  titles$: Observable<ArticleTitleDto[]>


  isInitialPage: boolean = true;

  page: number = 1;

  pageSize = 10;

  totalCount: number;

  pageSizes = [ 5, 10,15];

  minLengthTerm = 4;

  optionSelected: string;

  errors: any[];

  showCategories = false;

  categoryId: number = 0; // If the value > 0 then searchs By CategoryID

  constructor(private formbuilder: FormBuilder, private searchService: SearchService) {

    this.formSearch = this.formbuilder.group({

      searchInput: ['', [RxwebValidators.minLength({ value: 3 })]]

    });

  }


  ngOnInit() {
    this.searchTitles(); //si no inicio no jala las sugerencias de titulos 
  }


  searchTitles() {

    // https://angular.io/guide/http#optimizing-server-interaction-with-debouncing

    // Set to 1 in case the page Change.
    this.page = 1;


    this.titles$ = this.formSearch.get("searchInput").valueChanges.pipe(

      // get value
      map((term: string) => {

        //  so cant pass empty spaces
        return term.trim();
      })
      // if character length greater then 4
      , filter(res => {
        return res !== null && res.length >= this.minLengthTerm
      })

      , debounceTime(500)

      // If previous query is diffent from current   
      //, distinctUntilChanged() // Disabled (Allow me to search again when i choose a category)


      , switchMap((term: string) => {

        // if the  value is the same as the onOptionSelected  return an empty Observable<ArticlesTitlesDto> (Doesnt make another api call)

        if (term === this.optionSelected) { return of(this.titles) }

        let params = this.setTitlesParams(term, this.categoryId,)

        return this.searchService.searchTitles(params)

      })

    );

  }


  onOptionSelected(event: MatAutocompleteSelectedEvent) {

    this.optionSelected = event.option.value.trim();

    this.search(this.isInitialPage, this.optionSelected)
  }


  onEnter() {
    // Get the value from input
    const termFromInput = this.formSearch.get("searchInput").value.trim();

    // Ill Check <= 3 else return ( so i dont make and api call )
    if (termFromInput.length <= 3) {
      return;
    }

    this.search(this.isInitialPage, termFromInput);
  }


  search(pageDefault: boolean, term: string) {

    // At startup those are the values ​​but after a search it may change so I reset to default

    if (pageDefault) { this.page = 1; this.pageSize = 10; }

    const params = this.setRequestParams(term, this.page, this.pageSize, this.categoryId);

    this.searchService.searchArticles(params).subscribe(
      (resp: PaginatedListOfArticleDto) => {

        this.totalCount = resp.totalCount;

        this.articlesItems = resp.items;

      }, error => {
        console.error(error);
      }

    )


  }


  getCategoryId(categoryId: number) {


    this.categoryId = categoryId;

    // Clears the previous results if exists 
    if (this.articlesItems?.length > 0 || this.totalCount == 0) {
      this.totalCount = null;
      this.articlesItems = [];

    }

    // Send the same value but now has the categoryID
    this.formSearch.get('searchInput').patchValue(this.formSearch.get('searchInput').value);


  }


  setTitlesParams(title, categoryId) {
    let params = new HttpParams();

    params = params.append('title', title.trim());

    params = params.append('categoryId', categoryId);

    return params;

  }


  setRequestParams(searchTitle, page, pageSize, categoryId) {

    let params = new HttpParams();

    params = params.append('title', searchTitle.trim());

    params = params.append('pageNumber', page);

    params = params.append('pageSize', pageSize);

    params = params.append('categoryId', categoryId);

    return params;
  }


  handlePageChange(event) {

    this.page = event;

    const termFromInput = this.formSearch.get("searchInput").value.trim();

    this.search(!this.isInitialPage, termFromInput);

  }


  handlePageSizeChange(event) {

    const termFromInput = this.formSearch.get("searchInput").value.trim();

    this.pageSize = event.target.value;

    this.page = 1;
    // cause i only need the searchTerm
    this.search(!this.isInitialPage, termFromInput);

  }


  ngOnDestroy(): void {

    // this.formSearch.reset(); //se comento despues de querer hacer funcionar regresar y sigan los resultados

  }

}
