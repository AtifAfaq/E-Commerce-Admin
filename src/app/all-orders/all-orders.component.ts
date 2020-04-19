import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataShiftingService } from './../data-shifting.service';
import { Order } from './../data-models/order';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  icon: boolean = false;
  allOrders: Array<Order> = [];
  currentTab = 'all';

  constructor(public router: Router, public service: DataShiftingService, public zone: NgZone) {
    this.getAllOrders();
  }

  ngOnInit() {

  }


  getAllOrders() {
    if (this.service.routeFrom == 'userOrder') {
      this.allOrders = this.service.userOrder;
    }
    else { this.allOrders = this.service.allOrders; }


    // this.service.allOrders.forEach(order => {
    //   this.allOrders.push(Object.assign({}, order));
    // });
    // this.allOrders[1] = Object.assign({}, this.service.allOrders[1])

    if (this.allOrders.length == 0) {
      this.router.navigate(['/home']);
    }
    this.allOrders.forEach(order => {
      order.statusArray = [];
      var sellerIds = [];
      sameSeller = false;
      order.myArray.forEach(product => {
        sellerIds.push(product.uid);
        order.statusArray.push(product.status || 'pending');
      });
      var sameSeller = sellerIds.every((val, i, arr) => val === arr[0]);
      if (!sameSeller) {
        order.sellerName = 'Multiseller';
      } else {
        this.service.allUsers.forEach(user => {
          if (sellerIds[0] == user.uid) {
            order.sellerName = user.firstName + " " + user.lastName;
          }
        });
      }
    });
    this.decending();
  }


  assending() {
    this.icon = true;
    this.allOrders.sort((a, b) => {
      return a.totalBill - b.totalBill;
    })
  }

  decending() {
    this.icon = false;
    this.allOrders.sort((a, b) => {
      return b.totalBill - a.totalBill
    })
  }


  orderDetails(order) {
    this.router.navigate(['/orderDetail/' + order.key]);
  }


}
