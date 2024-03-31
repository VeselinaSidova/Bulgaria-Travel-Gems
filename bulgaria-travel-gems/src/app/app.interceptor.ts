import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ErrorService } from './core/error/error.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppInterceptor implements HttpInterceptor {
  userLoginURL = '/users';
  constructor(private router: Router, private errorService: ErrorService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (
          event instanceof HttpResponse &&
          req.url.endsWith(this.userLoginURL) &&
          event.status === 200
        ) {
          const token = event.body.accessToken;
          if (token) {
            localStorage.setItem('auth_token', token);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        if (error.status === 403) {
          this.errorService.setError(error);
        } else {
          this.errorService.setError(error);
          this.router.navigate(['/error']);
        }
        return throwError(() => error);
      })
    );
  }
}
