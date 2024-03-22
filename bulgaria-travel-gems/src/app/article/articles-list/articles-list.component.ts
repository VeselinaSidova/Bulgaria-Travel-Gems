import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/types/article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
})
export class ArticlesListComponent {
  articles: Article[] | null = [];

  constructor(private articleService: ArticleService) {}
}
