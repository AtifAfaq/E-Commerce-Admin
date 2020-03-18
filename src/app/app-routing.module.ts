import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'home', component: AdminHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


  exports: [RouterModule]
})
export class AppRoutingModule { }
