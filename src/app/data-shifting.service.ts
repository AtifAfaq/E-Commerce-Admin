import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShiftingService {

  topProduct: any = {};
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
  topProducts: any = [];
  featuredProds: any = [];
  routeFrom: string;
  countListObjects: any = [];

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
    if (this.featuredProds.length == 0) {
      this.getallFeaturedProds();
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
      .on('child_added', (snapshot) => {
        var temp = snapshot.val();
        temp.key = snapshot.key;
        self.allReviews.push(temp);

      })
  }


  getallCategorys() {
    var self = this;
    self.allCategorys = [];
    firebase.database().ref().child('categories')
      .on('child_added', (snapshot) => {
        var data = snapshot.val();
        data.key = snapshot.key;
        self.allCategorys.push(data);
      })
  }


  getallProducts() {
    var self = this;
    self.allProducts = [];
    firebase.database().ref().child('products')
      .on('child_added', (snapshot) => {
        var data = snapshot.val();
        data.key = snapshot.key;
        self.allProducts.push(data);

      })
  }

  getallFeaturedProds() {
    var self = this;
    self.allUsers = [];
    self.loading = true;
    firebase.database().ref().child('featuredProducts')
      .on('child_added', (snapshot) => {
        var featureProd = snapshot.val();
        featureProd.key = snapshot.key;
        self.featuredProds.push(featureProd);
      })
  }


  getallUsers() {
    var self = this;
    self.allUsers = [];
    self.loading = true;
    firebase.database().ref().child('users')
      .on('child_added', (snapshot) => {
        var user = snapshot.val();
        user.key = snapshot.key;
        if (!user.isAdmin) {
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
        this.allUsers.forEach(user => {
          if (element.uid == order.uid) {
            temp.email = order.email;
            temp.totalOrders = element.count;
            temp.uid = element.uid;
            temp.totalBill = Number(order.totalBill) + Number(temp.totalBill);
            if (element.uid == user.uid) {
              temp = user;
              temp.userName = user.firstName + " " + user.lastName;
            }
          }
        });
      });
      this.topBuyers.push(temp);
    });
    this.loading = false;
    this.topBuyers.sort((a, b) => {
      return b.totalBill - a.totalBill;
    });
    console.log('topbuyer', this.topBuyers);
    this.getTopProducts();
  }


  getTopProducts() {
    var counts: any = {};
    this.allOrders.forEach(order => {
      var list: any = [];
      list = order.myArray;
      list.forEach(prod => {
        var x = prod.key;
        counts[x] = (counts[x] || 0) + 1;
      });

    });
    // var countListObjects: any = [];
    for (var key in counts) {
      var obj: any = {};
      obj.key = key;
      obj.count = counts[key];
      this.countListObjects.push(obj);
    }
    this.countListObjects.forEach(prodCount => {
      var tamp: any = {};
      this.allProducts.forEach(prod => {
        if (prod.key == prodCount.key) {
          this.allUsers.forEach(user => {
            if (user.uid == prod.uid) {
              tamp = prod;
              tamp.userName = user.firstName + " " + user.lastName;
              tamp.profileUrl = prod.productUrls[0];
              tamp.count = prodCount.count;
            }
          });
        }
      });
      this.topProducts.push(tamp);
    });
    this.topProducts.sort((a, b) => {
      return b.count - a.count;
    });
  }

}
