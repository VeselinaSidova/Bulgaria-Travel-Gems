import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article } from 'src/app/types/article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css'],
})
export class MyArticlesComponent implements OnInit {
  myArticles$!: Observable<Article[]>;
  hasArticles = false;
  currentUser: any;

  constructor(private articleService: ArticleService) {}

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
}
