import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { SelectorMatcher } from '@angular/compiler';

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
  constructor() { }

  ngOnInit() {
    this.getallCategorys();
  }
  getallCategorys() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('categories')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key]
          temp.key = key;
          self.allCategorys.push(temp)
        }
        self.loading = false;
        console.log(self.allCategorys)
      })

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

  addCategory() {
    this.loading = true;
    this.uploadImage();

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
              alert(e.message);
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
