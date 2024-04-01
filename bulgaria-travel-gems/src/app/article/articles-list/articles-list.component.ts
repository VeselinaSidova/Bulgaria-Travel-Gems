import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/types/article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
})
export class ArticlesListComponent implements OnInit {
  articles: Article[] = [];
  hasArticles: boolean = true;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.hasArticles = articles.length > 0;
      },
      error: (error) => {
        console.error('Error fetching articles:', error);
        this.hasArticles = false;
      },
    });
  }
}
