import { DashboardOrderInvoiceComponent } from './../components/dashboard-order-invoice/dashboard-order-invoice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterviewUserComponent } from '../sections/masterview-user/masterview-user.component';
import { ShopComponent } from '../components/shop/shop.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { ShopDetailComponent } from '../components/shop-detail/shop-detail.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { HomeUserComponent } from '../components/home-user/home-user.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { OrderTrackingComponent } from '../components/order-tracking/order-tracking.component';
import { ErrorComponent } from '../components/error/error.component';
import { FaqComponent } from '../components/faq/faq.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { DashboardInfoEditComponent } from '../components/dashboard-info-edit/dashboard-info-edit.component';
import { DashboardOrderComponent } from '../components/dashboard-order/dashboard-order.component';
import { DashboardChangePasswordComponent } from '../components/dashboard-change-password/dashboard-change-password.component';
import { DashboardWishlistComponent } from '../components/dashboard-wishlist/dashboard-wishlist.component';
import { ContactComponent } from '../components/contact/contact.component';
import { CartComponent } from '../components/cart/cart.component';
import { BlogsComponent } from '../components/blogs/blogs.component';
import { BlogsDetailComponent } from '../components/blogs-detail/blogs-detail.component';
import { LoginAdminComponent } from '../../login-admin/login-admin.component';

const routes: Routes = [
  { path: '', component: MasterviewUserComponent, children: [
    { path: '', component: HomeUserComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'shop-detail', component: ShopDetailComponent },
    { path: 'privacy', component:PrivacyPolicyComponent},
    { path: 'order-tracking', component:OrderTrackingComponent},
    { path: 'sign-in', component:SignInComponent},
    { path: 'sign-up', component:SignUpComponent},
    { path: 'error', component:ErrorComponent},
    { path: 'faq', component:FaqComponent},
    { path: 'blogs', component:BlogsComponent},
    { path: 'blog-detail', component:BlogsDetailComponent},
    { path: 'contact', component:ContactComponent},
    { path: 'dashboard', component:DashboardComponent},
    { path: 'cart', component:CartComponent},
    { path: 'checkout', component:CheckoutComponent},
    { path: 'order-tracking', component:OrderTrackingComponent},
    { path: 'dashboard-info-edit', component:DashboardInfoEditComponent},
    { path: 'dashboard-order', component:DashboardOrderComponent},
    { path: 'dashboard-wishlist', component:DashboardWishlistComponent},
    { path: 'dashboard-change-password', component:DashboardChangePasswordComponent},
    { path: 'dashboard-order-invoice', component:DashboardOrderInvoiceComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
