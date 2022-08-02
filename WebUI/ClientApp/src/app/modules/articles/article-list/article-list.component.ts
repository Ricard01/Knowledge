import { HttpParams } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy,  Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, merge, of as observableOf } from 'rxjs';
import { switchMap, map, catchError, startWith } from 'rxjs/operators';
import { ArticleDto } from 'src/app/models';
import { IButtonContainerSettings } from 'src/app/shared/models/button-container';
import { ArticleService } from '../articles.service';
import { ModalContainerComponent } from 'src/app/shared/components/modal-container/modal-container.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

/** Modify ChangeDetectionStrategy to OnPush
For this solution, you'r basically telling angular:
Stop checking for changes; i'll do it only when i know is necessary
The quick fix: Modify your component so it'll use ChangeDetectionStrategy.OnPush
https://stackoverflow.com/questions/54611631/expressionchangedafterithasbeencheckederror-on-angular-6-while-using-mat-tab
https://stackoverflow.com/questions/39787038/how-to-manage-angular2-expression-has-changed-after-it-was-checked-exception-w/49667060#49667060
*/
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class ArticleListComponent implements AfterViewInit {

  settingsButton = {
    fn: this.goToCreatePage.bind(this),
    icon: 'post_add',
    text: 'Create'
  } as IButtonContainerSettings;

  displayedColumns: string[] = ['id', 'title', 'message', 'category', 'articleTags', 'options'];
  filteredAndPagedIssues: Observable<ArticleDto[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize = '15';
  resultsLength = 0;
  isLoadingResults: boolean;

  // https://levelup.gitconnected.com/how-to-pass-data-between-ngx-bootstrap-modal-and-parent-e348cd596cf7
  bsModalRef: BsModalRef;

  categoryId: number = 0;


  constructor(
    private articleService: ArticleService,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }


  ngAfterViewInit() {
    this.getArticles();
  }


  getArticles() {

    // TODO Application Sort
    this.filteredAndPagedIssues = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {

          let params = this.setParams(this.paginator.pageIndex + 1, this.pageSize)

          this.isLoadingResults = true;

          if (this.categoryId != 0) {

            params = params.append('categoryId', this.categoryId.toString());

            return this.articleService.getArticlesByCategory(params);
          }

          return this.articleService.getArticles(params)
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.totalCount;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // this.isRateLimitReached = true;
          return observableOf([]);
        })
      );

  }


  getArticlesByCategory(categoryId: number) {

    this.resetPaging(); // Sets default page. 
    this.categoryId = categoryId;
    this.getArticles();

  }


  goToCreatePage() {
    this.router.navigate(['articles/create'])
  }


  goToEditPage(title: string, id: string) {
    this.router.navigate([`articles/${title}/${id}/edit`]);
  }


  goToDetailPage(title: string, id: string) {
    this.router.navigate([`articles/${title}/${id}/`])
  }


  delete(id: number, title: string) {

    const initialState = { module: 'Article', name: title };

    this.bsModalRef = this.modalService.show(ModalContainerComponent, { initialState, class: 'modal-dialog-centered' });

    this.bsModalRef.content.event.subscribe(() => {

      this.articleService.delete(id).subscribe({
        next: (v) => {
          this.snackbarService.success('Article was deleted successfully');
          
          // to refresh the table
          this.getArticlesByCategory(0);
        },
        error: (e) => console.log(e)
      });

    });
  }


  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }


  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }


  setParams(page, pageSize) {

    let params = new HttpParams();

    params = params.append('pageNumber', page);
    params = params.append('pageSize', pageSize);

    return params;
  }


}



