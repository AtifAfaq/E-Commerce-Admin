import { Component, OnInit, NgZone } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Product } from './../data-models/product';
import { Review } from './../data-models/review';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  loading = false;
  product: Product;
  myReview: Array<Review> = [];
  rate1 = 0;
  rate2 = 0;
  rate3 = 0;
  rate4 = 0;
  rate5 = 0;
  avgRating: any;

  constructor(
    public zone: NgZone,
    public router: Router,
    public service: DataShiftingService) { }


  ngOnInit() {
    this.product = this.service.product;
    if (!this.product.key) {
      this.router.navigate(['/home']);
    }
    this.getMyReviews();
  }


  getDiscount(product) {
    var disc = ((Number(product.originalPrice) - Number(product.discountedPrice)) / Number(product.originalPrice)) * 100;
    product.discount = disc;
    return disc;
  }


  getMyReviews() {
    this.service.allReviews.forEach(review => {
      if (review.productKey == this.product.key) {
        this.service.allUsers.forEach(user => {
          if (user.uid == review.uid) {
            review.profileUrl = user.profileUrl || null;
            this.myReview.push(review);
          }
        });
      }
    });
    setTimeout(() => {
      this.reviewCount();
    }, 2000);
  }


  reviewCount() {
    for (var i = 0; i < this.myReview.length; i++) {
      var rate = this.myReview[i].rating;
      if (rate == 1) {
        this.rate1++;
      }
      else if (rate == 2) {
        this.rate2++;
      }
      else if (rate == 3) {
        this.rate3++;
      }
      else if (rate == 4) {
        this.rate4++;
      }
      else if (rate == 5) {
        this.rate5++;
      }
    }
    this.avgRating = ((this.rate1) * 1 + (this.rate2) * 2 + (this.rate3) * 3 + (this.rate4) * 4 + (this.rate5) * 5) / this.myReview.length;
  }

  changeStatus(status, index) {
    var self = this;
    self.product.status = status;
    var updates = {};
    updates['/products/' + self.product.key + "/status"] = status;
    firebase.database().ref().update(updates).then(() => {

    })
  }


  addToFeature(product) {
    var updates = {};
    updates['/featuredProducts/' + product.key] = product;
    product.featured = true;
    updates['/products/' + product.key] = product;
    firebase.database().ref().update(updates)
      .then(() => {
        alert("Product added to Featured Product")
      })
      .catch((e) => {
        alert(e.message);
      })
  }

  removeFeature(product) {
    var updates = {};
    updates['/featuredProducts/' + product.key] = [];
    product.featured = false;
    updates['/products/' + product.key] = product;
    firebase.database().ref().update(updates)
      .then(() => {
        alert("Product removed from Featured Product")
      })
      .catch((e) => {
        alert(e.message);
      })
  }


}
