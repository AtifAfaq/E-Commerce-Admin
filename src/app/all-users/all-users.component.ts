import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  allUsers = [];
  userArr = [];
  constructor(public service: DataShiftingService,
    public router: Router) {
    this.allUsers = this.service.allUsers;
  }

  ngOnInit() {
    this.allUsers = this.service.allUsers;
    this.allUsers.forEach(user => {
      if (user.isAdmin == false || !user.isAdmin) {
        this.userArr.push(user)
      }

    });
    if (this.allUsers.length == 0) {
      debugger;
      this.router.navigate(['/home']);
    }
  }

  seeProfile(user) {
    this.service.user = user;
    this.router.navigate(["/userDetail"])
  }

}
