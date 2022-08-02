import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [AuthorizeGuard],
    children: [
      { path: 'search', loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule) },
      { path: 'articles', loadChildren: () => import('./modules/articles/articles.module').then(m => m.ArticlesModule) },
      { path: 'categories', loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'tags', loadChildren: () => import('./modules/tags/tags.module').then(m => m.TagsModule) },  
      { path: '**', redirectTo: 'articles' }
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true,
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
