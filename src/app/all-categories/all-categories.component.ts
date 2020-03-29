import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { SelectorMatcher } from '@angular/compiler';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {
  loading: boolean = false;
  allCategorys: any = [];
  category: any = {};
  userImage: any = '';
  newFile: boolean = false;
  constructor(public service: DataShiftingService,
    public router: Router) { }

  ngOnInit() {
    this.allCategorys = this.service.allCategorys;
    console.log(this.allCategorys);
    if (this.allCategorys.length == 0) {
      this.router.navigate(['/home']);
    }
  }


  onChangeFile(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.userImage = files[0];  // Object of image containing image properties. for example name, size etc
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.category.profileUrl = reader.result;
      this.newFile = true;

    }
  }

  manualChecks() {
    this.allCategorys.forEach(element => {
      if (element.Name == this.category.Name) {
        alert("Cateogry name already in use")
        return false;
      }
    });
    return true;
  }

  addCategory() {
    if (this.manualChecks()) {
      this.loading = true;
      this.uploadImage();
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
        this.category = {};
        this.loading = false;
      })
      .catch((e) => {
        alert(e.message);
      })
  }

}
