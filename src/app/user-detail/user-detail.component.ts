import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';
import { User } from './../data-models/user';
import { Product } from '../data-models/product';
import { Order } from './../data-models/order';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User;
  allProducts: Array<Product> = [];
  userProds: Array<Product> = [];
  allOrders: Array<Order> = [];
  allUsers: Array<User> = [];
  userOrder: Array<Order> = [];

  constructor(
    public service: DataShiftingService,
    public router: Router) {
    this.user = this.service.user;
    if (!this.user.firstName) {
      this.router.navigate(['/home']);
    }
    this.getUserData();
  }


  ngOnInit() {
  }


  getUserData() {
    this.allProducts = this.service.allProducts;
    this.allProducts.forEach(product => {
      if (this.user.uid == product.uid) {
        this.userProds.push(product);
      }
    });
    this.service.userProds = this.userProds;

    this.allOrders = this.service.allOrders;
    this.allOrders.forEach(order => {
      if (order.uid == this.user.uid) {
        this.userOrder.push(order);
      }
    });
    this.service.userOrder = this.userOrder;
  }


  userProducts() {
    this.service.routeFrom = 'userDetail';
    if (this.userProds.length) {
      this.router.navigate(['/allProducts']);
    }
    else {
      alert("This user do not have any product")
    }
  }


  userOrders() {
    this.service.routeFrom = 'userOrder';
    if (this.userOrder.length) {
      this.router.navigate(['/allOrders'])
    }
    else {
      alert("This user do not have any order")
    }
  }

}
