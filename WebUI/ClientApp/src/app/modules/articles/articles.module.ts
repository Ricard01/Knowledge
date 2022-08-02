import { NgModule } from '@angular/core';
import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesModule } from '../categories/categories.module';
import { TagsModule } from '../tags/tags.module';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from '../../shared/interceptors/custom-url-serializer';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';



@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleComponent,
    ArticleDetailComponent,
  ],
  imports: [
    SharedModule,
    ArticlesRoutingModule,
    CategoriesModule,
    TagsModule,

  ],
  providers: [
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
  ]
})
export class ArticlesModule { }
