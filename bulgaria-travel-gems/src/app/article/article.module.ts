import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleComponent } from './article/article.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { LikedArticlesComponent } from './liked-articles/liked-articles.component';

@NgModule({
  declarations: [
    AddArticleComponent,
    ArticleComponent,
    ArticlesListComponent,
    MyArticlesComponent,
    LikedArticlesComponent,
  ],
  imports: [CommonModule],
})
export class ArticleModule {}
