import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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
  page: number = 1;
  pageSize: number = 10;
  pageCount: number = 0;
  collectionSize: number = 0;
  
  constructor(private httpService: HttpService, private toastr: ToastrService) {
    this.refreshUsers()
  }

  ngOnInit(): void {
  }
  refreshUsers(): void {
    this.httpService.getAllUsers(this.page, this.pageSize).subscribe((data: UserList) => {
      this.users = data.data;
      this.pageCount = data.pagination.pageCount;
      this.collectionSize = data.pagination.rowCount;
      this.toastr.success(`Page ${this.page} loaded`, 'Success!');

    }, error => {
      this.toastr.error(error.message, 'Error!');
    });
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      let user: User = new User(form.value.name, form.value.email, form.value.password);
      this.httpService.createUser(user).subscribe(() => {
        console.log('Success!');
        this.refreshUsers();
        this.toastr.success('User added successfully', 'Success!');
      },
        error => {
          this.toastr.error(error.message, 'Error!');
        });
    }
  }
  loadPage(newPage: number) {
      this.page = newPage;
      console.log(`Refresh users: ${this.page}`)
      this.refreshUsers();
  }
}
