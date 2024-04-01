import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authState$$ = new BehaviorSubject<{
    isLoggedIn: boolean;
    user: Omit<User, 'password'> | null;
  }>({
    isLoggedIn: false,
    user: null,
  });

  authState$ = this.authState$$.asObservable();

  AUTH_TOKEN_KEY = 'auth_token';
  USER_DATA_KEY = 'user_data';

  constructor(private apiService: ApiService, private http: HttpClient) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem(this.AUTH_TOKEN_KEY);
    const userDataJson = localStorage.getItem(this.USER_DATA_KEY);
    const userData = userDataJson ? JSON.parse(userDataJson) : null;
    this.authState$$.next({
      isLoggedIn: !!token,
      user: userData,
    });
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
          const userData = {
            id: response._id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
          };
          localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
          this.authState$$.next({ isLoggedIn: true, user: userData });
        })
      );
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<User> {
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
    localStorage.removeItem(this.USER_DATA_KEY);
    return this.apiService
      .request('POST', `${environment.baseUrl}/users/logout`)
      .pipe(
        tap(() => this.authState$$.next({ isLoggedIn: false, user: null }))
      );
  }
}
