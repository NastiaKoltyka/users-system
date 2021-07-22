import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id: number;
  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute) {
    this.id = 0
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
  }

}
