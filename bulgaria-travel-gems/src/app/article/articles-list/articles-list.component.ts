import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from 'src/app/types/article';
import { ArticleService } from '../article.service';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/types/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  articles: Article[] = [];
  hasArticles: boolean = false;
  currentUser: Omit<User, 'password'> | null = null;

  constructor(
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getArticles();
    this.subscriptions.add(
      this.userService.authState$.subscribe((state) => {
        this.currentUser = state.user;
      })
    );
  }

  getArticles(): void {
    this.subscriptions.add(
      this.articleService.getArticles().subscribe({
        next: (articles) => {
          this.articles = articles;
          this.hasArticles = articles.length > 0;
        },
        error: (error) => {
          console.error('Error fetching articles from server:', error);
          this.hasArticles = false;
        },
      })
    );
  }

  onToggleLike(articleId: string): void {
    this.subscriptions.add(
      this.userService.toggleLikedArticle(articleId).subscribe({
        next: (user) => {},
        error: (error) => console.error('Error toggling liked article:', error),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
