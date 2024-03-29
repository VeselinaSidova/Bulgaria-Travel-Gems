import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/types/article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
})
export class ArticlesListComponent implements OnInit {
  articles: Article[] | null = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        console.log('Articles fetched successfully:', articles); // Add this line to print the articles
      },
      error: (error) => {
        console.error('Error fetching articles:', error);
        this.articles = [];
      },
    });
  }
}
