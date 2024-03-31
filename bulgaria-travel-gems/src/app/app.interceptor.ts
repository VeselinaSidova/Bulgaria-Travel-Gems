import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const { baseUrl } = environment;

@Injectable()
class AppInterceptor implements HttpInterceptor {
  usersURL = '/users';
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (
          event instanceof HttpResponse &&
          req.url.endsWith('/users/login') &&
          event.status === 200
        ) {
          const token = event.body.accessToken;
          if (token) {
            localStorage.setItem('auth_token', token);
          }
        }
      })
    );
  }
}

export const appInterceptorProvider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS,
};
