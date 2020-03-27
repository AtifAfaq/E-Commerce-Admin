import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AttachSession } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  onLoginForm: FormGroup;
  email: string = '';
  password: string = '';
  uid: string = '';
  loading: boolean = false;

  constructor(public fb: FormBuilder, public router: Router) {
    if (localStorage.getItem('userLoggedIn') == 'true') {
      router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.onLoginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  userLogin() {
    this.loading = true;
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        if (user) {
          this.uid = firebase.auth().currentUser.uid;
          this.getUserData();
        }
      })
      .catch((e) => {
        this.loading = false;
        alert(e.message);
      })
  }


  getUserData() {
    var self = this;
    firebase.database().ref().child('users/' + this.uid)
      .once('value', (snapshot) => {
        debugger;
        var user = snapshot.val();
        if (user.isAdmin == true) {
          alert("Admin successfully logged in!");
          localStorage.setItem('firstName', user.firstName);
          localStorage.setItem('lastName', user.lastName);
          localStorage.setItem('email', user.email);
          localStorage.setItem('uid', this.uid);
          localStorage.setItem('userLoggedIn', 'true');
          self.loading = false;
          this.router.navigate(['/home']);
        }
        else {
          alert("invalid username & password")
          self.loading = false;
        }

      })
      .catch((e) => {
        self.loading = false;
        alert(e.message);
      })
  }

}
