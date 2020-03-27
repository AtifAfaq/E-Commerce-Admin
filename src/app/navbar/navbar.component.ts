import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showNavBar = false;

  constructor(public router: Router) {
    if (localStorage.getItem('userLoggedIn') == 'false') {
      router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

  openNavBar() {
    this.showNavBar = true;
  }

  closeNavBar() {
    this.showNavBar = false;
  }


  signout() {
    var user = firebase.auth().currentUser;
    if (user) {
      firebase.auth().signOut()
        .then(() => {
          alert("Admin Logged Out!");
          localStorage.clear();
          this.router.navigate(['/login']);
          localStorage.setItem('userLoggedIn', 'false');
        })
        .catch((e) => {
          alert(e.message);
        })
    }
    else {
      localStorage.clear();
      localStorage.setItem('userLoggedIn', 'false');
      this.router.navigate(['/login']);
    }
  }

}
