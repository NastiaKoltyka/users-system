import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '..//../http.sevice';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';


import { User } from '../../classes/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [HttpService]
})
export class UserDetailsComponent implements OnInit {
  id: number;
  user:User;
  private routeSubscription: Subscription;
  constructor(private httpService: HttpService, private route: ActivatedRoute,  private toastr: ToastrService, private router: Router) {
    this.id = 0
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    this.user = new User('','','');
  }

  ngOnInit(): void {
      this.httpService.getUser(this.id).subscribe((data: User) => {
        this.user = data;
        this.toastr.success(`User details loaded`, 'Success!');
  
      }, error => {
        this.toastr.error(error.message, 'Error!');
      });
    }
    deleteUser(){
      this.httpService.deleteUser(this.id).subscribe(() => {
        this.router.navigate(['/users'])
        this.toastr.success(`User deleted`, 'Success!');
  
      }, error => {
        this.toastr.error(error.message, 'Error!');
      });
    }
    editUser(){
      this.router.navigate(['/user-edit', this.id])
    }

}
