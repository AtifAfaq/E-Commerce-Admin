import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShiftingService {

  user: any = {};
  allProducts: any = [];
  allUsers: any = [];
  product: any = {};
  allCategorys: any = [];
  allReviews: any = [];
  loading: boolean = false;
  categoriesData: any = [];
  allOrders: any = [];
  topBuyers: any = [];
  routeFrom: string;

  public fooSubject = new Subject<any>();

  constructor() {
    if (this.allUsers.length == 0) {
      this.getallUsers();
    }
    if (this.allProducts.length == 0) {
      this.getallProducts();
    }
    if (this.allReviews.length == 0) {
      this.getallReviews();
    }
    if (this.allCategorys.length == 0) {
      this.getallCategorys();
    }
  }



  publishSomeData(temp: any) {
    this.fooSubject.next(temp);
  }

  getObservable(): Subject<any> {
    return this.fooSubject;
  }


  getallReviews() {
    var self = this;
    self.allReviews = [];
    firebase.database().ref().child('reviews')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key]
          temp.key = key;
          self.allReviews.push(temp);
        }
      })
  }


  getallCategorys() {
    var self = this;
    self.allCategorys = [];
    firebase.database().ref().child('categories')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key]
          temp.key = key;
          self.allCategorys.push(temp);
        }
      })
  }


  getallProducts() {
    var self = this;
    self.allProducts = [];
    firebase.database().ref().child('products')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allProducts.push(temp);
        }
      })
  }


  getallUsers() {
    var self = this;
    self.allUsers = [];
    firebase.database().ref().child('users')
      .once('value', (snapshot) => {
        var userData = snapshot.val();
        for (var key in userData) {
          var user = userData[key];
          user.key = key;
          self.allUsers.push(user);
        }
        if (self.allOrders.length == 0) {
          self.getallOrders();
        }
      })
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
        self.getTopBuyers();
      })
      .catch(() => {
        self.loading = false;
      })
  }


  getTopBuyers() {
    var counts: any = {};
    this.allOrders.forEach(element => {
      var x = element.uid;
      counts[x] = (counts[x] || 0) + 1;
    });

    var countObjects = [];
    for (var key in counts) {
      var obj: any = {};
      obj.uid = key;
      obj.count = counts[key];
      countObjects.push(obj);
    }

    countObjects.forEach(element => {
      var temp: any = {
        totalBill: 0
      };
      this.allOrders.forEach(order => {
        if (element.uid == order.uid) {
          temp.userName = order.firstName + " " + order.lastName;
          temp.email = order.email;
          temp.totalOrders = element.count;
          temp.uid = element.uid;
          temp.totalBill = Number(order.totalBill) + Number(temp.totalBill);
        }
      });
      this.topBuyers.push(temp);
    });
    this.loading = false;
    this.topBuyers.sort((a, b) => {
      return b.totalBill - a.totalBill;
    });
    console.log(this.topBuyers);
  }


}
