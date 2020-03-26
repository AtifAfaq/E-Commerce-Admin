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
    this.user = this.service.user;
    debugger;
    if (this.user == null) {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit() {
  }

}
