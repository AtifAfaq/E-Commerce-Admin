import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showNavBar = false;
  constructor() { }

  ngOnInit() {
  }
  openNavBar() {
    this.showNavBar = true;

  }
  closeNavBar() {
    this.showNavBar = false;
  }


}
