import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private jwt: JwtHelperService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('/auth')) {
      return next.handle(req);
    } else if (req.url.includes('/countries') || req.url.includes('/states')) {
      var tokenPais = localStorage.getItem('tokenPais');
      if (tokenPais !== null) {
        req = req.clone({
          setHeaders: {
            Authorization: tokenPais,
          },
        });
      }
      return next.handle(req);
    } else if (req.url.includes('/getaccesstoken')) {
      req = req.clone({
        setHeaders: {
          'api-token':
            'T8yAPUQp9wQPJDdbfVFyGGFYuWsOLg_7lyKv5W7VZwoWWzKM8Ns7Y-gd4sFlioM1SzU',
          'user-email': 'portfolio@gmail.com',
        },
      });
      return next.handle(req);
    }
    var currentUser = this.isLogin;
    var token = localStorage.getItem('token');
    if (currentUser) {
      req = req.clone({
        setHeaders: {
          Authorization: '' + token,
        },
      });
    }
    return next.handle(req);
  }

  public get isLogin(): boolean {
    var token = localStorage.getItem('token');
    if (token !== '') {
      return !this.jwt.isTokenExpired(token);
    } else {
      return false;
    }
  }
}
