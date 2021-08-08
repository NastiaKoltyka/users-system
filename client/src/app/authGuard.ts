import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import { AuthService } from './auth.sevice';
import { User } from './classes/user';;
@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor() {

    }
}
