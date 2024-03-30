import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddArticleComponent } from './add-article/add-article.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { LikedArticlesComponent } from './liked-articles/liked-articles.component';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleDetailsComponent } from './article-details/article-details.component';

@NgModule({
  declarations: [
    AddArticleComponent,
    ArticleDetailsComponent,
    ArticlesListComponent,
    MyArticlesComponent,
    LikedArticlesComponent,
  ],
  imports: [CommonModule, ArticleRoutingModule, SharedModule],
})
export class ArticleModule {}
