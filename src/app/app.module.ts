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
    AllProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
