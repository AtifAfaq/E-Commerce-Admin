import { Component, OnInit, NgZone } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  loading = false;
  product: any = {};
  myReview: any = [];
  rate1 = 0;
  rate2 = 0;
  rate3 = 0;
  rate4 = 0;
  rate5 = 0;
  avgRating: any;


  constructor(public zone: NgZone,
    public service: DataShiftingService) { }

  ngOnInit() {
    this.product = this.service.product;
    console.log(this.product);
    this.getMyReviews();
  }

  getDiscount(product) {
    var disc = ((Number(product.originalPrice) - Number(product.discountedPrice)) / Number(product.originalPrice)) * 100;
    product.discount = disc;
    return disc;
  }

  getMyReviews() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('reviews')
      .orderByChild('productKey').equalTo(self.product.key)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var review = data[key];
          self.getUserData(review);
        }
        self.loading = false;
        setTimeout(() => {
          self.reviewCount();
        }, 2000);
      })
      .catch((e) => {
        self.loading = false;
        alert(e.message);
      })
  }


  getUserData(review) {
    var self = this;
    firebase.database().ref().child('users')
      .orderByChild('uid').equalTo(review.uid)
      .once('value', (snapshot) => {
        self.zone.run(() => {
          var data = snapshot.val();
          for (var key in data) {
            var user = data[key];
            review.profileUrl = user.profileUrl || null;
            review.firstName = user.firstName;
            review.lastName = user.lastName;
            self.myReview.push(review);
          }
        })
      })
  }


  reviewCount() {
    debugger
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
}
