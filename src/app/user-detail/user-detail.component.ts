import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user = {};
  constructor(public service: DataShiftingService,
    public router: Router) {
    debugger;
    this.user = this.service.user;

    if (!this.user) {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit() {
  }

}
