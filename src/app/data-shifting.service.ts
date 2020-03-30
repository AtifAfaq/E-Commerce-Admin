import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataShiftingService {
  user = {};
  allProducts = [];
  allUsers = [];
  product = {};
  allCategorys = [];
  allReviews = [];
  loading: boolean = false;
  categoriesData: any = [];

  constructor() {
    this.getallProducts();
    this.getallUsers();
    this.getallCategorys();
    this.getallReviews();

    // if (this.allProducts.length == 0) {
    //   this.getallProducts();
    // }
    // if (this.allReviews.length == 0) {
    //   this.getallReviews();
    // }
    // if (this.allCategorys.length == 0) {
    //   this.getallCategorys();
    // }
    // if (this.allUsers.length == 0) {
    //   this.getallUsers();
    // }
  }
  getallReviews() {
    var self = this;
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
    self.loading = true;
    firebase.database().ref().child('products')
      .once('value', (snapshot) => {
        debugger;
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allProducts.push(temp);
          self.loading = false;
        }

      })
  }


  getallUsers() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('users')
      .once('value', (snapshot) => {
        var userData = snapshot.val();
        for (var key in userData) {
          var user = userData[key];
          user.key = key;
          self.allUsers.push(user)
          self.loading = false;
        }

      })
  }

}
