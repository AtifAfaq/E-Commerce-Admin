import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';
import { Product } from './../data-models/product';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  allOrders = [];

  allReviews = [];
  allUsers = [];
  allCategorys = [];
  topBuyers: any = [];
  countListObjects: any = [];


  loading: boolean = false;
  showNavBar = false;
  topProducts: Array<Product> = [];
  allProducts: Array<Product> = [];
  featuredProds: Array<Product> = [];

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
    this.featuredProds = this.service.featuredProds;
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

  buyerdetail(seller) {
    this.service.user = seller;
    this.router.navigate(['/userDetail']);
  }

}

