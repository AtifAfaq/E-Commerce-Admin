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
  allUsers = [];
  loading: boolean = false;
  showNavBar = false;
  constructor(public service: DataShiftingService) { }

  ngOnInit() {
    this.getallProducts();
    this.getallUsers();
  }
  openNavBar() {
    this.showNavBar = true;

  }
  closeNavBar() {
    this.showNavBar = false;
  }

  getallProducts() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('products')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          self.allProducts.push(temp);
          self.loading = false;
        }
        this.service.allProducts = this.allProducts;
      })
    console.log(this.allProducts)
  }
  getallUsers() {
    var self = this;
    this.loading = true;
    firebase.database().ref().child('users')
      .once('value', (snapshot) => {
        var userData = snapshot.val();
        for (var key in userData) {
          var user = userData[key];
          self.allUsers.push(user)
          self.loading = false;
        }
        this.service.allUsers = this.allUsers;
      })
    console.log(self.allUsers)
  }
}
