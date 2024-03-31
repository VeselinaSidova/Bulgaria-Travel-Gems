import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { LikedArticlesComponent } from './liked-articles/liked-articles.component';
import { AuthActivate } from '../guards/auth.activate';
import { ArticleDetailsComponent } from './article-details/article-details.component';

const routes: Routes = [
  {
    path: 'articles',
    children: [
      { path: '', pathMatch: 'full', component: ArticlesListComponent },
      { path: ':_id', component: ArticleDetailsComponent },
    ],
  },
  {
    path: 'add-article',
    component: AddArticleComponent,
    canActivate: [AuthActivate],
  },
  {
    path: 'my-articles',
    component: MyArticlesComponent,
    canActivate: [AuthActivate],
  },
  {
    path: 'liked-articles',
    component: LikedArticlesComponent,
    canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
