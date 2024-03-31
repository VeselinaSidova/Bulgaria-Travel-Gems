import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isLoggedIn$$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn$$.asObservable();

  AUTH_TOKEN_KEY = 'auth_token';

  constructor(private apiService: ApiService, private http: HttpClient) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem(this.AUTH_TOKEN_KEY);
    this.isLoggedIn$$.next(!!token);
  }

  login(email: string, password: string): Observable<any> {
    return this.apiService
      .request('POST', `${environment.baseUrl}/users/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.AUTH_TOKEN_KEY, response.accessToken);
          this.isLoggedIn$$.next(true);
        })
      );
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.apiService.request(
      'POST',
      `${environment.baseUrl}/users/register`,
      {
        firstName,
        lastName,
        email,
        password,
      }
    );
  }

  logout() {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    return this.apiService
      .request('POST', `${environment.baseUrl}/users/logout`)
      .pipe(tap(() => this.isLoggedIn$$.next(false)));
  }
}
