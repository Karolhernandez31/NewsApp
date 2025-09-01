import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const loggedUser = localStorage.getItem('loggedUser');
    const isLoggedIn = !!loggedUser;
    const url = state.url;

    if ((url === '/login' || url === '/register') && isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }

    if (!isLoggedIn && url !== '/login' && url !== '/register') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
