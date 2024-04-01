import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenAuthService {
  AUTH_TOKEN_KEY = 'auth_token';

  constructor(private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  verifyToken(): Observable<never> | string {
    const token = this.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('No auth token present'));
    }
    return token;
  }
}
