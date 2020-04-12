import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: any = {};
  allProducts: any = [];
  userProds: any = [];
  allOrders: any = [];
  allUsers: any = [];
  userOrder: any = [];

  constructor(
    public service: DataShiftingService,
    public router: Router) {
    this.user = this.service.user;
    console.log(this.user)
    if (!this.user.firstName) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }
  userProducts() {
    this.allProducts = this.service.allProducts;
    this.allProducts.forEach(product => {
      var prod: any = {}
      if (this.user.uid == product.uid) {
        prod = product;
        this.userProds.push(prod);
      }
    });
    this.service.userProds = this.userProds;
    console.log(this.userProds);
    this.service.routeFrom = 'userDetail';
    if (this.userProds.length) {
      this.router.navigate(['/allProducts']);
      return;
    }
    else {
      alert("This user do not have any product")
    }
  }


  userOrders() {
    this.allOrders = this.service.allOrders;
    debugger;
    this.allOrders.forEach(order => {
      var odr: any = {}
      if (order.uid == this.user.uid) {
        odr = order;
        this.userOrder.push(odr);
      }
    });
    this.service.routeFrom = 'userOrder';
    this.service.userOrder = this.userOrder
    if (this.userOrder.length) {
      this.router.navigate(['/allOrders'])
    }
    else {
      alert("This user do not have any order")
    }
  }
}
