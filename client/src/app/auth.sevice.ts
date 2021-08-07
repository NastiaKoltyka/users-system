import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials } from './classes/credentials';
import { User } from './classes/user';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private helper = new JwtHelperService();
    private host: string = 'http://127.0.0.1:3000/api/v1/auth';
    token: string;
    user: User;
    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token') ?? '';
        this.user = this.token.length == 0 ? new User('','','') : this.helper.decodeToken<User>(this.token);
    }

    loginUser(user: Credentials): Promise<void> {
        return this.http.post(`${this.host}/login`, user)
            .toPromise()
            .then((data: any) => {
                this.token = data.token;
                localStorage.setItem('token', this.token);
                this.user = this.helper.decodeToken<User>(this.token);
            });
    }
}

