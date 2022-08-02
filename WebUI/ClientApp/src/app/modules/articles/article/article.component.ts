import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../articles.service';
import { Subject, takeUntil } from 'rxjs';
import { ArticleDto, CreateArticleCommand, TagCategoryDto, UpdateArticleCommand } from 'src/app/models';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TagsService } from '../../tags/tags.service';
import { CategorySelectionValidator } from 'src/app/shared/validators/category-selection.validator';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  articleForm: FormGroup
  private unsubscribeAll: Subject<any> = new Subject();

  article: ArticleDto;
  articleToCreate: CreateArticleCommand;
  articleToUpdate: UpdateArticleCommand;
  allTags: TagCategoryDto[];

  categoryIdSelectedNumber: number;

  htmlString: string;

  showPreview: boolean = true;
  creating: boolean = false;
  mostrarTags: boolean = false;
  errors: [];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private tagService: TagsService,
    private snackbarService: SnackbarService) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.creating = !id; //true if no id paramater


    if (!this.creating) {
      
      //Update
      this.articleService.getArticle(+id).pipe(takeUntil(this.unsubscribeAll)).subscribe((resp: ArticleDto) => {
      
        this.article = resp;      

        this.getTagsByCategoryId(resp.categoryId); // so i can compare and fill tags

        let article = this.mapArticleToForm(this.article);

        this.articleForm.setValue(article);

      });
    }

    this.initForm();

  }


  private initForm() {
    this.articleForm = this.formBuilder.group({
      title: [, [RxwebValidators.notEmpty(), RxwebValidators.maxLength({ value: 120 })]],
      quill: this.formBuilder.group({
        quillMessage: ['', RxwebValidators.notEmpty()]
      }),
      category: this.formBuilder.group({
        categoryName: ['', CategorySelectionValidator],
      }),
      articleTags: this.formBuilder.group({
        tags: [[]],
      }),
    })
  }


  get form() { return this.articleForm.controls };


  getTagsByCategoryId(Id: number) {
    this.form.articleTags['controls'].tags.reset([]) // clean selected tags when change categories --specialy for update purpose

    this.tagService.getTagsByCategory(Id).subscribe((resp) => {

      this.allTags = resp.tags;

      this.mostrarTags = true;

    });

    this.categoryIdSelectedNumber = Id;

  }


  save() {

    if (this.articleForm.valid) {

      if (this.creating) {

        const article: CreateArticleCommand = this.mapForm();

        this.articleService.create(article).subscribe({
          next: () => {

            this.snackbarService.success('Article was created successfully');
            this.router.navigate(['./articles']);

          },
          error: (e) => this.errors = e.error.errors
        });

      } else {

        const article: UpdateArticleCommand = this.mapForm()

        this.articleService.update(article).subscribe({
          next: () => {
            this.snackbarService.success('Article was updated successfully');
            this.router.navigate(['./articles'])
          },
          error: (e) => this.errors = e.error.errors
        });

      }

    }

  }


  mapArticleToForm(resp: ArticleDto) {    

    let categoryobj = { id: resp.categoryId, name: resp.category } //  Form expect "categoryDto" -obj-    

    let article = { title: resp.title, quill: { quillMessage: resp.message }, category: { categoryName: categoryobj }, articleTags: { tags: resp.articleTags } };    

    return article;

  }


  quillTextPreview(htmlString: string) {
    this.htmlString = htmlString;
  }


  mapForm() {

    let article: any;

    article = {
      title: this.form.title.value,
      message: this.form.quill.value.quillMessage,
      categoryId: this.form.category.value.categoryName.id,
      articleTags: this.form.articleTags['controls'].tags.value
    }

    if (!this.creating) {
      article = { ...article, id: Number(this.article.id) };
    }

    return article;

  }


  ngOnDestroy(): void {
    this.unsubscribeAll.unsubscribe();
  }


}
