import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {
  category: any = {};
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
      this.category.profileUrl = reader.result;
      this.newFile = true;

    }
  }

}
