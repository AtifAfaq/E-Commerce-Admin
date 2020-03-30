import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  allProducts = [];
  allReviews = [];
  allUsers = [];
  allCategorys = [];
  loading: boolean = false;
  showNavBar = false;

  constructor(
    public router: Router,
    public service: DataShiftingService) {
    this.allReviews = this.service.allReviews;
    this.allCategorys = this.service.allCategorys;
    this.allProducts = this.service.allProducts;
    this.allUsers = this.service.allUsers;
  }


  ngOnInit() {

  }


  showAllProducts() {
    this.service.routeFrom = 'home';
    this.router.navigate(['/allProducts']);
  }


  openNavBar() {
    this.showNavBar = true;
  }


  closeNavBar() {
    this.showNavBar = false;
  }



}
