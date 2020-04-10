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

  constructor(public router: Router, public service: DataShiftingService, public zone: NgZone) {

  }

  ngOnInit() {
    this.getallOrders();

  }

  getallOrders() {
    var self = this;
    self.allOrders = [];
    self.loading = true;
    firebase.database().ref().child('orders')
      .once('value', (snapshot) => {
        var orderData = snapshot.val();
        for (var key in orderData) {
          var order = orderData[key];
          order.key = key;
          self.allOrders.push(order)
        }
        console.log(this.allOrders)
        this.getallUsers();
        this.showPending();
      })
      .catch(() => {
        self.loading = false;
      })
  }


  getallUsers() {
    var self = this;
    self.allUsers = [];
    self.loading = true;
    firebase.database().ref().child('users')
      .once('value', (snapshot) => {
        var users = snapshot.val();
        for (var key in users) {
          var temp = users[key];
          temp.key = key;
          if (!temp.isAdmin) {
            self.allUsers.push(temp);
          }
        }
      })
    console.log('users', this.allUsers)
    this.getProdnSeller();
  }

  getProdnSeller() {
    var temp: any = {}
    this.allOrders.forEach(order => {
      order.myArray.forEach(product => {
        this.allUsers.forEach(user => {
          if (product.key == user.key) {
            temp = product;
            temp.email = user.email;
            temp.contact = user.contact;
            temp.firstName = user.firstName;
            temp.lastName = user.lastName;
            temp.uid = user.uid;
          }
          this.prodnSeller.push(temp);
          console.log(this.prodnSeller)
        });
      });

    });
    console.log(this.prodnSeller)
  }


  assending() {
    this.icon = true;
    this.allOrders.sort(function (a, b) {
      return a.totalBill - b.totalBill;
    })
  }

  decending() {
    this.icon = false;
    this.allOrders.sort(function (a, b) {
      return b.totalBill - a.totalBill
    })
  }

  orderDetails(o) {
    this.router.navigate(['/orderDetail']);
  }


  showPending() {
    for (var i = 0; i < this.allOrders.length; i++) {
      this.allOrders[i].myArray.forEach(product => {
        this.zone.run(() => {
          if (!product.status) {
            this.pendingArray.push(this.allOrders[i])
          }
          if (product.status == "accepted") {
            this.acceptedArray.push(this.allOrders[i])
          }
          if (product.status == "shipped") {
            this.shippedArray.push(this.allOrders[i])
          }
          if (product.status == "delivered") {
            this.deliveredArray.push(this.allOrders[i])
          }
          if (product.status == "cancelled") {
            this.cancelledArray.push(this.allOrders[i])
          }

        })
      })
    }

    this.loading = false;
  }

}
