import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from 'src/app/types/article';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | null = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const articleId = data['_id'];
      this.articleService.getArticleById(articleId).subscribe({
        next: (article) => {
          this.article = article;
        },
        error: () => {
          this.router.navigate(['/not-found']);
        },
      });
    });
  }

  editArticle(id: string): void {
    // Implement edit logic here
    console.log('Editing article', id);
  }

  deleteArticle(id: string): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.articleService.deleteArticle(id).subscribe({
        next: () => {
          this.router.navigate(['/articles']);
        },
      });
    }
  }
}
