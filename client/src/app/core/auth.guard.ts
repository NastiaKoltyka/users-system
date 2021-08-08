import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../auth.sevice';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url = route.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .join('/');

    let urlSegments = url.split('/');
    if (urlSegments.includes('users') || urlSegments.includes('user-edit')) {
      if (parseInt(urlSegments[urlSegments.length - 1]) == this.authService.user.id) {
        return true;
      }
    }

    if (this.authService.isLoggedIn()) {
      if (!this.authService.user.roles.includes(route.data.role)) {
        this.toastr.error(`You don't have sufficient access rights to access this page `, 'Error!');
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
