import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataShiftingService } from '../data-shifting.service';
import { Order } from './../data-models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderKey: any = '';
  order: Order;

  constructor(
    public route: ActivatedRoute,
    public service: DataShiftingService,
  ) {
    this.orderKey = route.snapshot.params.orderKey;
    this.getOrder(this.orderKey);
  }

  ngOnInit() {
  }


  getOrder(orderKey) {
    var allOrders = this.service.allOrders;
    allOrders.forEach(order => {
      if (order.key == orderKey) {
        this.order = order;
        this.getUserName();
        return
      }
    });
  }


  getUserName() {
    var allUsers = this.service.allUsers;
    if (this.order.myArray) {
      this.order.myArray.forEach(product => {
        allUsers.forEach(user => {
          if (product.uid == user.uid) {
            product.sellerName = user.firstName + " " + user.lastName;
          }
        });
      });
    }
  }

}
