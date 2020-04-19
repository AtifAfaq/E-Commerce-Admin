import { Component, OnInit, NgZone } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';
import { Review } from '../data-models/review';
import { Product } from '../data-models/product';
import { User } from './../data-models/user';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  reviews: Array<Review> = [];
  allProducts: Array<Product> = [];
  allUsers: Array<User> = [];
  allReviews: Array<Review> = [];
  loading: boolean = false;
  rate1 = 0;
  rate2 = 0;
  rate3 = 0;
  rate4 = 0;
  rate5 = 0;
  avgRating: any;

  constructor(public zone: NgZone,
    public router: Router,
    public service: DataShiftingService) {
    this.allProducts = this.service.allProducts;
    this.reviews = this.service.allReviews;
    this.allUsers = this.service.allUsers;
    this.getMyReviews();

  }

  ngOnInit() {
    setTimeout(() => {
      if (this.allReviews.length == 0) {
        this.router.navigate(['/home']);
      }
    }, 3000);
  }


  getMyReviews() {
    this.allProducts.forEach(product => {
      if (product.totalReview && product.totalReview > 0) {
        var temp: any = {
          reviews: []
        }
        temp.productName = product.productName;
        temp.discountedPrice = product.discountedPrice;
        temp.productImage = product.productUrls[0];
        temp.avgRating = product.avgRating;
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
    });

    console.log(this.allReviews);
  }



}
