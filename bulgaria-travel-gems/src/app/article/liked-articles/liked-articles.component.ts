import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from 'src/app/types/article';
import { ArticleService } from '../article.service';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-liked-articles',
  templateUrl: './liked-articles.component.html',
  styleUrls: ['./liked-articles.component.css'],
})
export class LikedArticlesComponent implements OnInit {
  likedArticles$: Observable<Article[]> | undefined;
  currentUser: Omit<User, 'password'> | null = null;

  constructor(
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.authState$.subscribe({
      next: (authState) => {
        this.currentUser = authState.user;
        if (this.currentUser && this.currentUser.likedArticles) {
          this.likedArticles$ = this.articleService
            .getArticles()
            .pipe(
              map((articles) =>
                articles.filter((article) =>
                  this.currentUser?.likedArticles?.includes(article._id!)
                )
              )
            );
        }
      },
      error: (error) => console.error('Error fetching liked articles:', error),
    });
  }

  onToggleLike(articleId: string): void {
    this.userService.toggleLikedArticle(articleId).subscribe({
      next: (user) => {},
      error: (error) => console.error('Error toggling liked article:', error),
    });
  }
}
