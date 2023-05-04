import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'https://portfolio-sody.onrender.com/api';
  private userSubject = new BehaviorSubject<User | null>(null);
  user = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwt: JwtHelperService
  ) {
    if(this.isLogin){
      this.getUser();
    } else {
      this.freelogin();
    }

    if (
      !localStorage.getItem('tokenPais') ||
      (localStorage.getItem('tokenPais') && this.esPaisExpirado)
    ) {
      this.getTokenPais();
    }
  }

  login(email: string, password: string) {
    localStorage.removeItem('freeToken');
    this.http
      .post(this.url + '/auth', { email: email, password: password })
      .subscribe(
        (res: any) => {
          if (res.Authorization !== null) {
            localStorage.setItem('token', res.Authorization);
            this.router.navigate(['/portfolio']);
            this.getUser();
          } else {
          }
        },
        (e: HttpErrorResponse) => {
          console.log(e);
        }
      );
  }

  freelogin() {
    this.http
      .post(this.url + '/auth', { email: 'enzoyerna@gmail.com', password: '12345678' })
      .subscribe(
        (res: any) => {
          if (res.Authorization !== null) {
            localStorage.setItem('freeToken', res.Authorization);
            this.getUser();
          } else {
          }
        },
        (e: HttpErrorResponse) => {
          console.log(e);
        }
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getTokenPais() {
    this.http
      .get('https://www.universal-tutorial.com/api/getaccesstoken')
      .subscribe((res: any) => {
        localStorage.setItem('tokenPais', 'Bearer ' + res.auth_token);
      });
  }

  public get isLogin(): boolean {
    if (this.token !== '') {
      return !this.jwt.isTokenExpired(this.token);
    } else {
      return false;
    }
  }

  get esPaisExpirado(): boolean {
    var token = localStorage.getItem('tokenPais');
    return this.jwt.isTokenExpired(token);
  }

  public get token(): string {
    var token = localStorage.getItem('token');
    if (token !== null) {
      return token;
    } else {
      return '';
    }
  }
  public get freeToken(): string {
    var token = localStorage.getItem('freeToken');
    if (token !== null) {
      return token;
    } else {
      return '';
    }
  }

  private getUser() {
    this.http
      .get<User>(this.url + '/usuario/traerEmail')
      .subscribe((user) => this.userSubject.next(user));
  }
}
