import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataShiftingService } from './../data-shifting.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  myProducts: Array<any> = [];
  p: number = 1;
  icon: boolean = false;
  allOrders: any = [];
  allUsers: any = [];
  prodnSeller: any = [];
  pendingArray = [];
  acceptedArray = [];
  shippedArray = [];
  deliveredArray = [];
  cancelledArray = [];
  loading: boolean = false;
  listOfOrders: any = [];

  constructor(public router: Router, public service: DataShiftingService, public zone: NgZone) {
    this.getAllOrders();
  }

  ngOnInit() {

  }


  getAllOrders() {
    this.allOrders = this.service.allOrders;
    if (this.allOrders.length == 0) {
      this.router.navigate(['/home']);
    }
    this.allOrders.forEach(order => {
      var sellerIds = [];
      sameSeller = false;
      order.myArray.forEach(product => {
        sellerIds.push(product.uid);
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

  orderDetails(o) {
    this.router.navigate(['/orderDetail']);
  }


  // showPending() {
  //   for (var i = 0; i < this.allOrders.length; i++) {
  //     this.allOrders[i].myArray.forEach(product => {
  //       this.zone.run(() => {
  //         if (!product.status) {
  //           this.pendingArray.push(this.allOrders[i])
  //         }
  //         if (product.status == "accepted") {
  //           this.acceptedArray.push(this.allOrders[i])
  //         }
  //         if (product.status == "shipped") {
  //           this.shippedArray.push(this.allOrders[i])
  //         }
  //         if (product.status == "delivered") {
  //           this.deliveredArray.push(this.allOrders[i])
  //         }
  //         if (product.status == "cancelled") {
  //           this.cancelledArray.push(this.allOrders[i])
  //         }
  //       })
  //     })
  //   }
  //   this.loading = false;
  // }

}
