import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './classes/user';
import { UserList } from './classes/user-list';
import { DeleteSuccess } from './classes/delete-success';
import { AuthService } from './auth.sevice';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  host: string = 'http://127.0.0.1:3000/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllUsers(page: number, pageSize: number): Observable<UserList> {
    return this.http.get<UserList>(`${this.host}/users?page=${page}&pageSize=${pageSize}`, this.getAuthHeader());
  }
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.host}/users/${userId}`, this.getAuthHeader());
  }
  deleteUser(userId: number): Observable<DeleteSuccess> {
    return this.http.delete<DeleteSuccess>(`${this.host}/users/${userId}`, this.getAuthHeader());
  }
  createUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.host}/users/`, user, this.getAuthHeader());
  }
  updateUser(userId: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.host}/users/${userId}`, user, this.getAuthHeader());
  }

  private getAuthHeader() {
    return { headers: { 'Authorization': `Bearer ${this.authService.token}` } } 
  }
}


