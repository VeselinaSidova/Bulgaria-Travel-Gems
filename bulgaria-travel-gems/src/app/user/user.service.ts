import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  AUTH_TOKEN_KEY = 'auth_token';

  get isLogged(): boolean {
    return !!localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  constructor(private apiService: ApiService) {}

  login(email: string, password: string) {
    return this.apiService.request(
      'POST',
      `${environment.baseUrl}/users/login`,
      { email, password }
    );
  }

  logout() {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
  }
}
