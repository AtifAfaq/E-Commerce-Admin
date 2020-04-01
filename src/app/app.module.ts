import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarOverlayComponent } from './sidebar-overlay/sidebar-overlay.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ChatWithAdminComponent } from './chat-with-admin/chat-with-admin.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { ProfileComponent } from './profile/profile.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DataShiftingService } from './data-shifting.service';
import * as firebase from 'firebase';
import { FilteredProductsComponent } from './filtered-products/filtered-products.component';
import { ReviewsComponent } from './reviews/reviews.component';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDT97phJ84IgJ0Ye_GrZJChWRs44WJzni0",
  authDomain: "ecommerceproject-26041.firebaseapp.com",
  databaseURL: "https://ecommerceproject-26041.firebaseio.com",
  projectId: "ecommerceproject-26041",
  storageBucket: "ecommerceproject-26041.appspot.com",
  messagingSenderId: "1012121042557",
  appId: "1:1012121042557:web:ae1d219104e4dc7d2f3b14",
  measurementId: "G-MW7V09MP4P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

@NgModule({
  declarations: [
    AppComponent,
    SidebarOverlayComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    NavbarComponent,
    AllCategoriesComponent,
    AllUsersComponent,
    FeaturedProductsComponent,
    AllOrdersComponent,
    ChatWithAdminComponent,
    SignOutComponent,
    ProfileComponent,
    AllProductsComponent,
    UserDetailComponent,
    OrderDetailComponent,
    ProductDetailComponent,
    FilteredProductsComponent,
    ReviewsComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataShiftingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
