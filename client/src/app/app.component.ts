import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.sevice';
import { User } from './classes/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-system';
  constructor(public router: Router, public authService: AuthService ) { 
  }
}
