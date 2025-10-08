import { Component, HostListener, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartServiceService } from './Core/Ngrx/Cart-Service/cart-service.service';
import { WishListService } from './Core/Ngrx/WishList-Service/wish-list.service';
import { AuthServiceFunctionsService } from './Core/Authentication/AuthServiceFunctions/auth-service-functions.service';
import { GoogleSignInService } from './Core/Authentication/GoogleSignIn/google-sign-in.service';
import { UserServiceService } from './Core/Services/ControllerService/UserService/user-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UrbanIndie-app';
  isHomePage: boolean = false;
  MobileMenu = false;

  scrolled: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.MobileMenu == false) {
      this.scrolled = (window.pageYOffset > 85 * window.innerHeight / 100); // Change the value (100) as per your requirement
    }
    else {
      this.scrolled = (window.pageYOffset > 40 * window.innerHeight / 100); // Change the value (100) as per your requirement
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Update the screen width whenever the window is resized
    this.MobileMenu = window.innerWidth <= 768;
    // Call any other methods or update your component's logic based on the new screen width here
  }

  constructor(
    private router: Router,
    private cart: CartServiceService,
    private wishlist: WishListService,
    private google: GoogleSignInService,
    private authService: AuthServiceFunctionsService,
    private userService:UserServiceService
  ) {
    this.MobileMenu = window.innerWidth <= 768;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = (event.url === '/');
      }
    });
  }



  ngOnInit(): void {


    if (this.authService.ifUserLoggedIn() == false) {
      this.google.googleSignIn();
    }
    else {
      if(this.authService.ifUserLoggedIn()!=false){
        AuthServiceFunctionsService.isLogin.next(true);
      }
      this.cart.getCartData(true, String(AuthServiceFunctionsService.getAccessUserFromCookie()));
      this.wishlist.getWishListData(true, String(AuthServiceFunctionsService.getAccessUserFromCookie()));
      this.userService.getUserData(String(AuthServiceFunctionsService.getAccessUserFromCookie()));
    }

  }



}
