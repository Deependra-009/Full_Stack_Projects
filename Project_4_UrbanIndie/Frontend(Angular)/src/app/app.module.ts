import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './Core/Ngrx/Ngrx-Functions/Reducers';
import { FooterComponent } from './Modules/Components/footer/footer.component';
import { LoginWithPhonePageComponent } from './Modules/Pages/Login Pages/login-with-phone-page/login-with-phone-page.component';
import { SignUpWithPhonePageComponent } from './Modules/Pages/SignUp Pages/sign-up-with-phone-page/sign-up-with-phone-page.component';
import { LoginPageComponent } from './Modules/Pages/Login Pages/login-page/login-page.component';
import { SignUpPageComponent } from './Modules/Pages/SignUp Pages/sign-up-page/sign-up-page.component';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HomePageComponent } from './Modules/Pages/home-page/home-page.component';
import { NavbarComponent } from './Shared/ReusableComponents/navbar/navbar.component';
import { ProductPageComponent } from './Modules/Pages/product-page/product-page.component';
import { ButtonComponent } from './Shared/ReusableComponents/button/button.component';
import { ProductCard1Component } from './Shared/ReusableComponents/Product Cards/product-card1/product-card1.component';
import { ProductCard2Component } from './Shared/ReusableComponents/Product Cards/product-card2/product-card2.component';
import { FavouritesComponent } from './Modules/Pages/favourites/favourites.component';
import { ProductCard3Component } from './Shared/ReusableComponents/Product Cards/product-card3/product-card3.component';
import { ProductPageListComponent } from './Modules/Pages/product-page-list/product-page-list.component';
import { FormsModule } from '@angular/forms';
import { QuerySearchFilterService } from './Core/CustomPipe/CustomPipe/query-search-filter.pipe';
import { MenPageComponent } from './Modules/Pages/men-page/men-page.component';
import { WomenPageComponent } from './Modules/Pages/women-page/women-page.component';
import { KidPageComponent } from './Modules/Pages/kid-page/kid-page.component';
import { CartPageComponent } from './Modules/Pages/cart-page/cart-page.component';import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TestingComponent } from './Modules/Components/testing/testing.component';
import { ApparelCategoryPageComponent } from './Modules/Pages/apparel-category-page/apparel-category-page.component';
import { AddressComponent } from './Modules/Pages/address&payment/address/address.component';
import { PaymentComponent } from './Modules/Pages/address&payment/payment/payment.component';
import { AmountBreakupComponent } from './Shared/ReusableComponents/amount-breakup/amount-breakup.component';
import { CartAddressPaymentComponent } from './Shared/sharedLayOuts/cartAddressPayment/cart-address-payment/cart-address-payment.component';
import { EditAddressModalComponent } from './Shared/ReusableComponents/modal/edit-address-modal/edit-address-modal/edit-address-modal.component';
import { OrderPageComponent } from './Modules/Pages/order-page/order-page.component';
import { UserDashboardComponent } from './Shared/sharedLayOuts/user-dashboard/user-dashboard.component';
import { ProfilePageComponent } from './Modules/Pages/profile-page/profile-page.component';
import { ProductCard4DepartmentpageComponent } from './Shared/ReusableComponents/Product Cards/product-card4-departmentpage/product-card4-departmentpage.component';
import { BreadcrumbComponent } from './Shared/ReusableComponents/breadcrumb/breadcrumb.component';
import { ProductCard4WishlistComponent } from './Shared/ReusableComponents/Product Cards/product-card4-wishlist/product-card4-wishlist.component';
import { OrderStatusComponentComponent } from './Modules/Pages/order-status-component/order-status-component.component';
import { LottieModule } from "ngx-lottie";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import player from "lottie-web";

export function playerFactory() {
  return player;
}
import { AuthInterceptor } from './Core/Authentication/AuthGuard/auth-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ContactUsComponent } from './Modules/Pages/contact-us/contact-us.component';
import { CarouselComponent } from './Shared/ReusableComponents/carousel/carousel/carousel.component';
import { NgxShimmerLoadingModule } from  'ngx-shimmer-loading';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginPageComponent,
    SignUpPageComponent,
    LoginWithPhonePageComponent,
    SignUpWithPhonePageComponent,
    HomePageComponent,
    ProductPageComponent,
    ButtonComponent,
    ProductCard1Component,
    ProductCard2Component,
    FavouritesComponent,
    ProductCard3Component,
    ProductPageListComponent,
    QuerySearchFilterService,
    MenPageComponent,
    WomenPageComponent,
    KidPageComponent,
    CartPageComponent,
    TestingComponent,
    ApparelCategoryPageComponent,
    AddressComponent,
    PaymentComponent,
    AmountBreakupComponent,
    CartAddressPaymentComponent,
    EditAddressModalComponent,
    OrderPageComponent,
    UserDashboardComponent,
    ProfilePageComponent,
    ProductCard4DepartmentpageComponent,
    BreadcrumbComponent,
    ProductCard4WishlistComponent,
    OrderStatusComponentComponent,
    ContactUsComponent,
    CarouselComponent,
  ],
  imports: [
    MatNativeDateModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDatepickerModule,
    HttpClientModule,
    MatCheckboxModule,
    FormsModule,
    StoreModule.forRoot(rootReducer, {}),
    LottieModule.forRoot({ player: playerFactory }),
    ToastrModule.forRoot()  , NgxShimmerLoadingModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
