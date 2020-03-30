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
    public service: DataShiftingService) {
    this.allReviews = this.service.allReviews;
    this.allCategorys = this.service.allCategorys;
    this.allProducts = this.service.allProducts;
    this.allUsers = this.service.allUsers;
  }


  ngOnInit() {

  }


  openNavBar() {
    this.showNavBar = true;
  }


  closeNavBar() {
    this.showNavBar = false;
  }



}
