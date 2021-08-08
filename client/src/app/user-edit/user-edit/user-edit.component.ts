import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '..//../http.sevice';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { User } from '../../classes/user';
import { AuthService } from '..//../auth.sevice'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [HttpService]
})
export class UserEditComponent implements OnInit {
  id: number;
  user: User;
  originalUser: User;

  private routeSubscription: Subscription;
  constructor(public authService: AuthService, private httpService: HttpService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.id = 0
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    this.user = new User('', '', '');
    this.originalUser = this.user;
  }

  ngOnInit(): void {
    this.httpService.getUser(this.id).subscribe((data: User) => {
      this.user = data;
      this.originalUser = Object.assign({}, this.user); // clone user
      this.toastr.success(`User details loaded`, 'Success!');

    }, error => {
      this.toastr.error(error.message, 'Error!');
    });

  }
  onSubmit(form: NgForm) {
    let user: User = new User(form.value.name, form.value.email, form.value.password);
    user.phone = form.value.name;
    user.date_of_birth = form.value.birth;
    user.about_me = form.value.about_me;
    user.roles = [];
    let allPossibleRoles = ['can_view_users', 'can_edit_users', 'can_delete_users', 'can_view_details', 'can_view_details_full', 'can_edit_users_full'];
    allPossibleRoles.forEach(role => {
      if (form.value[role]) {
        user.roles.push(role);
      }
    });
    this.httpService.updateUser(this.id, this.user).subscribe(() => {
      this.router.navigate(['/users'])
      this.toastr.success('User updated successfully', 'Success!');
    },
      error => {
        this.toastr.error(error.error.description, 'Error!');
      });
  }

  isUserChanged():boolean{
    return this.user.name != this.originalUser.name 
    || this.user.email != this.originalUser.email
    || this.user.password != this.originalUser.password
    || this.user.phone != this.originalUser.phone
    || this.user.date_of_birth != this.originalUser.date_of_birth
    || this.user.about_me != this.originalUser.about_me
    || this.user.roles.sort().toString() != this.originalUser.roles.sort().toString()
  }

}
