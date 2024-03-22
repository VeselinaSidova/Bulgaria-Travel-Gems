import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../types/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:3030/data/articles';

  constructor(private http: HttpClient) {}

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const token = this.getAuthToken();
    console.log('Auth Token:', token); // This will log the token to the console
    if (token) {
      headers = headers.set(
        'X-Authorization',
        '17179c4b5486d5d92f2a14bc556fdea897f18f0c9a0558642cd09f894acc48e1'
      );
    }
    return headers;
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article, {
      headers: this.getHeaders(),
    });
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(
      `${this.apiUrl}/articles/${article.id}`,
      article
    );
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/articles/${id}`);
  }
}
