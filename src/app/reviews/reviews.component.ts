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
    this.allProducts.forEach(product => {
      if (product.totalReview && product.totalReview > 0) {
        var temp: any = {
          reviews: []
        }
        temp.productName = product.productName;
        temp.productImage = product.productUrls[0];
        this.reviews.forEach(review => {
          if (review.productKey == product.key) {
            this.allUsers.forEach(user => {
              if (user.uid == review.uid) {
                review.userName = user.firstName + " " + user.lastName;
                review.profileUrl = user.profileUrl || null;
              }
            });
            temp.reviews.push(review)
          }

        });
        this.allReviews.push(temp)
      }
      console.log(this.allReviews);
    });
  }

}
