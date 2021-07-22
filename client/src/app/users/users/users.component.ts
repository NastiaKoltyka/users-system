import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { HttpService } from '..//../http.sevice';
import { User } from '../../classes/user';
import { UserList } from 'src/app/classes/user-list';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [HttpService]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  page: number = 0;
  pageSize: number = 10;
  pageCount: number = 0;
  constructor(private httpService: HttpService) { 
    this.httpService.getAllUsers(this.page, this.pageSize).subscribe((data: UserList) => {
      this.users = data.data;
      this.pageCount = data.pagination.pageCount;
    });
  }

  ngOnInit(): void {
  }

}
