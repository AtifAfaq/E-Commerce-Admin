import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  allOrders = [];
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
    this.allOrders = this.service.allOrders;
    console.log("orders", this.allOrders)
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
  topBuyer() {
    for (var i = 0; i < this.allOrders.length; i++) {
      var userUid = this.allOrders[i].uid;

    }

  }


}

