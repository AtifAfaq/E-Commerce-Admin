import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DataShiftingService } from './../data-shifting.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  allProducts = [];
  allReviews = [];
  allUsers = [];
  allCategorys = [];
  loading: boolean = false;
  showNavBar = false;

  constructor(
    public service: DataShiftingService) { }


  ngOnInit() {
    this.getallProducts();
    this.getallUsers();
    this.getallCategorys();
    this.getallReviews();
  }


  openNavBar() {
    this.showNavBar = true;
  }


  closeNavBar() {
    this.showNavBar = false;
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
        self.service.allReviews = self.allReviews;
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
        self.service.allCategorys = self.allCategorys;
      })
  }


  getallProducts() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('products')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allProducts.push(temp);
          self.loading = false;
        }
        self.service.allProducts = self.allProducts;
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
        self.service.allUsers = self.allUsers;
      })
  }

}
