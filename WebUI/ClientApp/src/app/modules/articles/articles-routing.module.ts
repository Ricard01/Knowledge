import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';



const routes: Routes = [

  { path: '', component: ArticleListComponent },

  { path: 'create', component: ArticleComponent },

  { path: ':title/:id/edit', component: ArticleComponent },

  { path: ':title/:id', component: ArticleDetailComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
