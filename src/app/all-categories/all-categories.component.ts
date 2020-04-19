import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';
import { Category } from './../data-models/category';
import { Product } from './../data-models/product';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  loading: boolean = false;
  allCategorys: Array<Category> = [];
  category: Category;
  userImage: any = '';
  newFile: boolean = false;
  allProducts: Array<Product> = [];
  categoriesData: Array<Product> = [];

  constructor(
    public service: DataShiftingService,
    public router: Router) {
    this.allProducts = service.allProducts;
  }


  ngOnInit() {
    this.allCategorys = this.service.allCategorys;
    if (this.allCategorys.length == 0) {
      this.router.navigate(['/home']);
    }
  }



  getProductsCount(category) {
    var count = 0;
    this.allProducts.forEach(element => {
      if (element.productCategory == category.Name) {
        count++;
      }
    });
    return count;
  }


  onChangeFile(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.userImage = files[0];  // Object of image containing image properties. for example name, size etc
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.category.profileUrl = <string>reader.result;
      this.newFile = true;

    }
  }

  addCategory() {
    if (this.manualChecks()) {
      this.loading = true;
      this.uploadImage();
    }
  }


  manualChecks() {
    var alreadyNameExists = false;
    this.allCategorys.forEach(element => {
      if (element.Name.toLowerCase() == this.category.Name.toLowerCase()) {
        alreadyNameExists = true;
      }
    });
    if (alreadyNameExists) {
      alert("Cateogry name already in use");
      return false;
    } else {
      return true;
    }
  }


  uploadImage() {
    var self = this;
    let storageRef = firebase.storage().ref();
    var metadata = {
      contentType: 'image/jpeg/png'
    };
    const filename = Math.floor(Date.now() / 1000);
    storageRef.child('profileImages/' + filename).put(self.userImage, metadata)
      .on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              self.category.profileUrl = downloadURL;
              self.updateData();
            })
            .catch((e) => {
              console.log(e.message);
              self.loading = false;
            })
        });
  }

  updateData() {
    var postKey = firebase.database().ref().child('categories').push().key;
    var updates = {};
    updates['/categories/' + postKey] = this.category;
    firebase.database().ref().update(updates)
      .then(() => {
        alert("Category added successfully")
        this.allCategorys.unshift(this.category);
        // this.category = {};
        this.loading = false;
      })
      .catch((e) => {
        alert(e.message);
      })
  }


  changeStatus(status, index) {
    var self = this;
    self.allCategorys[index].status = status;
    var updates = {};
    updates['/categories/' + self.allCategorys[index].key + "/status"] = status;
    firebase.database().ref().update(updates).then(() => {

    })
  }


  bringCategories(v) {
    this.allProducts.forEach(product => {
      if (product.productCategory == v.Name) {
        this.categoriesData.push(product);
      }
    });
    this.service.categoriesData = this.categoriesData;
    this.service.routeFrom = 'categories';
    this.router.navigate(['/allProducts']);
  }


}
