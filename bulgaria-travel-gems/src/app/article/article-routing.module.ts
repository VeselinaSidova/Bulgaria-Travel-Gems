import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { LikedArticlesComponent } from './liked-articles/liked-articles.component';

const routes: Routes = [
  {
    path: 'articles',
    children: [
      { path: '', pathMatch: 'full', component: ArticlesListComponent },
      { path: ':_id', component: ArticlesListComponent },
    ],
  },
  { path: 'add-article', component: AddArticleComponent },
  { path: 'my-articles', component: MyArticlesComponent },
  { path: 'liked-articles', component: LikedArticlesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
