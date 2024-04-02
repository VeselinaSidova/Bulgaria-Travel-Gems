import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article } from 'src/app/types/article';
import { ArticleService } from '../article.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css'],
})
export class MyArticlesComponent implements OnInit {
  myArticles$!: Observable<Article[]>;
  hasArticles = false;
  currentUser: any;

  constructor(
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userDataJson = localStorage.getItem('user_data');
    if (userDataJson) {
      this.currentUser = JSON.parse(userDataJson);
    }

    if (this.currentUser?.id) {
      this.myArticles$ = this.articleService.getArticles().pipe(
        map((articles) => {
          const userArticles = articles.filter(
            (article) => article._ownerId === this.currentUser.id
          );
          this.hasArticles = userArticles.length > 0;
          return userArticles;
        })
      );
    }
  }

  onToggleLike(articleId: string): void {
    this.userService.toggleLikedArticle(articleId).subscribe({
      next: (user) => {},
      error: (error) => console.error('Error toggling liked article:', error),
    });
  }
}
