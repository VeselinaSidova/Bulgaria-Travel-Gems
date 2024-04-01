import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Article } from '../types/article';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment.development';
import { TokenAuthService } from 'src/app/shared/services/token-auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseUrl = environment.baseUrl;
  private apiUrl = `${this.baseUrl}/data/articles`;

  constructor(
    private apiService: ApiService,
    private tokenAuthService: TokenAuthService
  ) {}

  getArticles(): Observable<Article[]> {
    return this.apiService.request('GET', this.apiUrl);
  }

  getArticleById(id: string): Observable<Article> {
    return this.apiService.request('GET', `${this.apiUrl}/${id}`);
  }

  addArticle(
    title: string,
    imageUrl: string,
    locationId: string,
    content: string
  ): Observable<Article> {
    const token = this.tokenAuthService.verifyToken();
    if (typeof token !== 'string') return token;
    return this.apiService.request(
      'POST',
      this.apiUrl,
      {
        title,
        imageUrl,
        locationId,
        content,
      },
      token
    );
  }

  deleteArticle(id: string): Observable<Article> {
    const token = this.tokenAuthService.verifyToken();
    if (typeof token !== 'string') return token;
    return this.apiService.request('DELETE', `${this.apiUrl}/${id}`, {}, token);
  }
}
