import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';
import { User } from './../data-models/user';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  p: number = 1;
  allUsers: Array<User> = [];

  constructor(public service: DataShiftingService,
    public router: Router) {
    this.allUsers = this.service.allUsers;
  }

  ngOnInit() {
    this.allUsers = this.service.allUsers;
    if (this.allUsers.length == 0) {
      this.router.navigate(['/home']);
    }
  }

  seeProfile(user) {
    this.service.user = user;
    this.router.navigate(["/userDetail"])
  }

}
