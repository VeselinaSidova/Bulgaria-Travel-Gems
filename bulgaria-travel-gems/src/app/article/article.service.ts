import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../types/article';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseUrl = environment.baseUrl;
  private apiUrl = `${this.baseUrl}/data/articles`;

  constructor(private apiService: ApiService) {}

  getArticles(): Observable<Article[]> {
    return this.apiService.request('GET', this.apiUrl);
  }
}
