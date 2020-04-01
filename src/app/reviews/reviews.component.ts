import { Component, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { DataShiftingService } from './../data-shifting.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  reviews: any = [];
  allProducts: any = [];
  allUsers: any = [];
  loading: boolean = false;

  allReviews: any = [
    {
      productImage: '',
      productName: '',
      reviews: [
        {
          rating: '',
          reviews: '',
          userName: '',
          userImage: ''
        }
      ]
    }
  ]

  constructor(public zone: NgZone,
    public service: DataShiftingService) {
    this.allProducts = this.service.allProducts;
    this.reviews = this.service.allReviews;
    this.allUsers = this.service.allUsers;
    this.getMyReviews();
  }


  ngOnInit() {

  }


  getMyReviews() {

  }

}
