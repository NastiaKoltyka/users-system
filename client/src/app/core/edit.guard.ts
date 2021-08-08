import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserEditComponent } from '../user-edit/user-edit/user-edit.component';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanDeactivate<UserEditComponent> {
  canDeactivate(
    component: UserEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
    if (!component.isUserChanged()) {
      return true;
    }
    return confirm('Are you sure?');
  }
}