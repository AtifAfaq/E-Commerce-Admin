import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  allProducts = [];
  allUsers = [];
  categoriesData: any = [];
  constructor(public service: DataShiftingService,
    public router: Router) {

  }

  ngOnInit() {
    this.allProducts = this.service.allProducts;
    this.service.allProducts = this.allProducts;
    this.categoriesData = this.service.categoriesData;
    if (this.allProducts.length == 0) {
      debugger;
      this.router.navigate(['/home']);
    }
  }
  productDetail(p) {
    this.service.product = p;
    this.router.navigate(['/productDetail']);
  }

  getDiscount(product) {
    var disc = ((Number(product.originalPrice) - Number(product.discountedPrice)) / Number(product.originalPrice)) * 100;
    product.discount = disc;
    return disc;
  }

  changeStatus(status, index) {
    var self = this;
    self.allProducts[index].status = status;
    var updates = {};
    updates['/products/' + self.allProducts[index].key + "/status"] = status;
    firebase.database().ref().update(updates).then(() => {

    })
  }

  addToFeature(product, index) {
    var postKey = firebase.database().ref().child('categories').push().key;
    var updates = {};
    product.status = "Featured Product";
    updates['/featuredProducts/' + product.key] = product;
    firebase.database().ref().update(updates)
      .then(() => {
        alert("Product added to Featured Product")
      })
      .catch((e) => {
        alert(e.message);
      })
  }


}
