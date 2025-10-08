import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from './Modules/Pages/SignUp Pages/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './Modules/Pages/Login Pages/login-page/login-page.component';
import { LoginWithPhonePageComponent } from './Modules/Pages/Login Pages/login-with-phone-page/login-with-phone-page.component';
import { SignUpWithPhonePageComponent } from './Modules/Pages/SignUp Pages/sign-up-with-phone-page/sign-up-with-phone-page.component';
import { HomePageComponent } from './Modules/Pages/home-page/home-page.component';
import { ProductPageComponent } from './Modules/Pages/product-page/product-page.component';
import { FavouritesComponent } from './Modules/Pages/favourites/favourites.component';
import { ProductPageListComponent } from './Modules/Pages/product-page-list/product-page-list.component';
import { MenPageComponent } from './Modules/Pages/men-page/men-page.component';
import { WomenPageComponent } from './Modules/Pages/women-page/women-page.component';
import { KidPageComponent } from './Modules/Pages/kid-page/kid-page.component';
import { CartPageComponent } from './Modules/Pages/cart-page/cart-page.component';
import { ApparelCategoryPageComponent } from './Modules/Pages/apparel-category-page/apparel-category-page.component';
import { AddressComponent } from './Modules/Pages/address&payment/address/address.component';
import { PaymentComponent } from './Modules/Pages/address&payment/payment/payment.component';
import { TestingComponent } from './Modules/Components/testing/testing.component';
import { CartAddressPaymentComponent } from './Shared/sharedLayOuts/cartAddressPayment/cart-address-payment/cart-address-payment.component';
import { OrderPageComponent } from './Modules/Pages/order-page/order-page.component';
import { UserDashboardComponent } from './Shared/sharedLayOuts/user-dashboard/user-dashboard.component';
import { ProfilePageComponent } from './Modules/Pages/profile-page/profile-page.component';
import { OrderStatusComponentComponent } from './Modules/Pages/order-status-component/order-status-component.component';
import { authGuardGuard } from './Core/Authentication/AuthGuard/auth-guard.guard';
import { ContactUsComponent } from './Modules/Pages/contact-us/contact-us.component';
const routes: Routes = [
  {
    path:'',
    component:HomePageComponent,
    canActivate:[authGuardGuard],
  },
  {
    path:'favourite',
    component: FavouritesComponent
  },
  {
    path:'login',
    component:LoginPageComponent,
  },
  {
    path:'product-page',
    component:ProductPageComponent
  },
  {
    path:'signup',
    component:SignUpPageComponent
  },
  {
    path:'login-phone',
    component:LoginWithPhonePageComponent
  },
  {
    path:'signup-phone',
    component:SignUpWithPhonePageComponent
  },
  
  {
    path:'search-product',
    component:ProductPageListComponent
  },
  {
    path:"men-page",
    component:MenPageComponent
  },
  {
    path:'women-page',
    component:WomenPageComponent
  },
  {
    path:'kid-page',
    component:KidPageComponent
  },
  {
    path:'cart-page',
    component:CartPageComponent
  },
  {
    path:'user',
    component:UserDashboardComponent,
    children:[
      {path:'',component:ProfilePageComponent},
      { path: 'order-page', component: OrderPageComponent },
      {path:'address-page',component:AddressComponent},
      {path:'contactus-page',component:ContactUsComponent}
    ]
  },
  {
    path: 'order',
  component: CartAddressPaymentComponent ,
    children: [
      { path: 'cart-page', component: CartPageComponent },
      { path: 'address-page', component: AddressComponent },
      { path: 'payment-page', component: PaymentComponent },
      { path: '', redirectTo: 'cart-page', pathMatch: 'full' } 
    ],
  },
  {
    path:':id/:id',
    component:ApparelCategoryPageComponent
  },
  {
    path:':department/:apparelcategory/:producttype',
    component:ProductPageListComponent
  },
  {
    path:'test',
    component:TestingComponent
  },
  {
    path:'current-order-status',
    component:OrderStatusComponentComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
