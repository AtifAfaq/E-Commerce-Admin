import { Component, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { DataShiftingService } from './../data-shifting.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  allReviews = [];
  myReview = [];
  allProducts = [];
  loading: boolean = false;
  constructor(public zone: NgZone,
    public service: DataShiftingService) {
    this.allProducts = this.service.allProducts
    console.log(this.allProducts)
  }

  ngOnInit() {
    this.getMyReviews();
  }

  getMyReviews() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('reviews')
      // .orderByChild('productKey').equalTo(self.product.key)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var review = data[key];
          self.getUserData(review);
        }
        self.loading = false;
        // setTimeout(() => {
        //   self.reviewCount();
        // }, 2000);
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
}
