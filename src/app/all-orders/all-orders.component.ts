import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  myProducts: Array<any> = [];
  icon: boolean = false;
  constructor(public router: Router) { }

  ngOnInit() {
  }
  assending() {
    this.icon = true;
    this.myProducts.sort(function (a, b) {
      return a.totalBill - b.totalBill;
    })
  }

  decending() {
    this.icon = false;
    this.myProducts.sort(function (a, b) {
      return b.totalBill - a.totalBill
    })
  }

  orderDetails(o) {
    this.router.navigate(['/orderDetail']);
  }
}
