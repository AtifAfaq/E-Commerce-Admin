import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  userImage: any = '';
  newFile: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onChangeFile(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.userImage = files[0];  // Object of image containing image properties. for example name, size etc
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.user.profileUrl = reader.result;
      this.newFile = true;

    }
  }

  updateProfile() {
    localStorage.setItem('user', JSON.stringify(this.user));
    var retrievedObject = localStorage.getItem('user');
    console.log('user', JSON.parse(retrievedObject));
  }
}
