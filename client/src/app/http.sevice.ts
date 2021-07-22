import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { User } from './classes/user';
import { Observable } from 'rxjs';
import { UserList } from './classes/user-list';
import { DeleteSuccess } from './classes/delete-success';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  host: string = 'http://127.0.0.1:3000/api/v1';

  constructor(private http: HttpClient) { }

  getAllUsers(page: number, pageSize: number): Observable<UserList> {
    return this.http.get<UserList>(`${this.host}/users?page=${page}&pageSize=${pageSize}`);
  }
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.host}/users/${userId}`);
  }
  deleteUser(userId: number): Observable<DeleteSuccess> {
    return this.http.delete<DeleteSuccess>(`${this.host}/users/${userId}`);
  }
  createUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.host}/users/`, user);
  }
  updateUser(userId: number, user: User) : Observable<void> {
    return this.http.put<void>(`${this.host}/users/${userId}`, user);
  }
}


