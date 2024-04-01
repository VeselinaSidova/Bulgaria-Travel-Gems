import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Article } from '../types/article';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseUrl = environment.baseUrl;
  private apiUrl = `${this.baseUrl}/data/articles`;

  constructor(private apiService: ApiService, private router: Router) {}

  getArticles(): Observable<Article[]> {
    return this.apiService.request('GET', this.apiUrl);
  }

  addArticle(
    title: string,
    imageUrl: string,
    locationId: string,
    content: string
  ): Observable<Article> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('No auth token present'));
    }
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
}
