import { Component, OnInit } from '@angular/core';


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
  page = 1;
  pageSize =10;
  constructor(private httpService: HttpService) { 
    this.httpService.getUser(5).subscribe((data: User) => console.log(data));
    this.httpService.getAllUsers(0, 100).subscribe((data: UserList) => console.log(data));
  }

  ngOnInit(): void {
  }

}
