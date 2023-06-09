import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './servicios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioGuard  {
  constructor(private auth: AuthService, private router: Router) {}

  /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if(this.auth.isLogin){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }*/
}
