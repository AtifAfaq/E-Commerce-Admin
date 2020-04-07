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
  topBuyers: any = [];
  countListObjects: any = [];
  topProducts: any = [];
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
    this.topBuyers = this.service.topBuyers;
    this.countListObjects = this.service.countListObjects;
    this.topProducts = this.service.topProducts;
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


  getDiscount(product) {
    var disc = ((Number(product.originalPrice) - Number(product.discountedPrice)) / Number(product.originalPrice)) * 100;
    product.discount = disc;
    return disc;
  }


  productDetail(product) {
    this.service.product = product;
    this.router.navigate(['/productDetail']);
  }

}

