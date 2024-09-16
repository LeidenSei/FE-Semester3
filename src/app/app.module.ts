import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { AboutUsComponent } from './user/components/about-us/about-us.component';
import { BlogsComponent } from './user/components/blogs/blogs.component';
import { BlogsDetailComponent } from './user/components/blogs-detail/blogs-detail.component';
import { CartComponent } from './user/components/cart/cart.component';
import { ContactComponent } from './user/components/contact/contact.component';
import { CheckoutComponent } from './user/components/checkout/checkout.component';
import { DashboardComponent } from './user/components/dashboard/dashboard.component';
import { DashboardChangePasswordComponent } from './user/components/dashboard-change-password/dashboard-change-password.component';
import { DashboardInfoEditComponent } from './user/components/dashboard-info-edit/dashboard-info-edit.component';
import { DashboardOrderComponent } from './user/components/dashboard-order/dashboard-order.component';
import { DashboardOrderInvoiceComponent } from './user/components/dashboard-order-invoice/dashboard-order-invoice.component';
import { DashboardWishlistComponent } from './user/components/dashboard-wishlist/dashboard-wishlist.component';
import { ErrorComponent } from './user/components/error/error.component';
import { FaqComponent } from './user/components/faq/faq.component';
import { OrderTrackingComponent } from './user/components/order-tracking/order-tracking.component';
import { PrivacyPolicyComponent } from './user/components/privacy-policy/privacy-policy.component';
import { ShopComponent } from './user/components/shop/shop.component';
import { ShopDetailComponent } from './user/components/shop-detail/shop-detail.component';
import { SignInComponent } from './user/components/sign-in/sign-in.component';
import { SignUpComponent } from './user/components/sign-up/sign-up.component';
import { MasterviewAdminComponent } from './components/masterview-admin/masterview-admin.component';
import { HeaderUserComponent } from './user/sections/header-user/header-user.component';
import { FooterUserComponent } from './user/sections/footer-user/footer-user.component';
import { MasterviewUserComponent } from './user/sections/masterview-user/masterview-user.component';
import { HomeUserComponent } from './user/compoents/home-user/home-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CategoryComponent,
    ProductComponent,
    AboutUsComponent,
    BlogsComponent,
    BlogsDetailComponent,
    CartComponent,
    ContactComponent,
    CheckoutComponent,
    DashboardComponent,
    DashboardChangePasswordComponent,
    DashboardInfoEditComponent,
    DashboardOrderComponent,
    DashboardOrderInvoiceComponent,
    DashboardWishlistComponent,
    ErrorComponent,
    FaqComponent,
    OrderTrackingComponent,
    PrivacyPolicyComponent,
    ShopComponent,
    ShopDetailComponent,
    SignInComponent,
    SignUpComponent,
    MasterviewAdminComponent,
    HeaderUserComponent,
    FooterUserComponent,
    MasterviewUserComponent,
    HomeUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
