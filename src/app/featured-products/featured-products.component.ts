import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {
  featuredProds: any = [];
  constructor(public service: DataShiftingService) {
    this.featuredProds = this.service.featuredProds;
  }

  ngOnInit() {
  }
  getDiscount(product) {
    var disc = ((Number(product.originalPrice) - Number(product.discountedPrice)) / Number(product.originalPrice)) * 100;
    product.discount = disc;
    return disc;
  }

  removeFeature(product, index) {
    var updates = {};
    this.featuredProds.splice(index, 1);
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
