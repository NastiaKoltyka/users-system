import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Credentials } from './classes/credentials';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token: string;
    host: string = 'http://127.0.0.1:3000/api/v1/auth';
    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token') ?? '';
    }

    loginUser(user: Credentials): Promise<void> {
        return this.http.post(`${this.host}/login`, user)
            .toPromise()
            .then((data: any) => {
                this.token = data.token;
                localStorage.setItem('token', this.token);
            });
    }

}

