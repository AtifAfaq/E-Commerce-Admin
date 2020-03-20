import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ChatWithAdminComponent } from './chat-with-admin/chat-with-admin.component';
import { SignOutComponent } from './sign-out/sign-out.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'home', component: AdminHomeComponent },
  { path: 'allCategories', component: AllCategoriesComponent },
  { path: 'allUsers', component: AllUsersComponent },
  { path: 'featuredProducts', component: FeaturedProductsComponent },
  { path: 'allOrders', component: AllOrdersComponent },
  { path: 'chatWithAdmin', component: ChatWithAdminComponent },

  { path: '', component: AdminLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


  exports: [RouterModule]
})
export class AppRoutingModule { }
