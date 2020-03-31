import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from '../data-shifting.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  allProducts = [];
  eventTriggered: boolean = false;

  constructor(
    public service: DataShiftingService,
    public router: Router) {
  }


  ngOnInit() {
    this.service.getObservable().subscribe((temp) => {
      this.eventTriggered = true;
      this.allProducts = [];
      this.allProducts = this.service.allProducts;
      if (this.allProducts.length == 0) {
        this.router.navigate(['/home']);
      }
    });
    if (this.service.routeFrom == 'home') {
      this.allProducts = this.service.allProducts;
      if (this.allProducts.length == 0) {
        this.router.navigate(['/home']);
      }
    } else if (this.service.routeFrom == 'categories') {
      this.allProducts = this.service.categoriesData;
      if (this.allProducts.length == 0) {
        this.router.navigate(['/home']);
      }
    }
    if (!this.eventTriggered && this.service.routeFrom != 'home' && this.service.routeFrom != 'categories') {
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
