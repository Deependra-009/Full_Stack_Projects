import { Component, Input, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthServiceFunctionsService } from 'src/app/Core/Authentication/AuthServiceFunctions/auth-service-functions.service';
import { DropDownItems } from 'src/app/Core/Constant_Data/DropDownItems';
import { ProductServiceService } from 'src/app/Core/Ngrx/Product-Service/product-service.service';
import { ProductControllerService } from 'src/app/Core/Services/ControllerService/ProductService/product-controller.service';
import { DataTransferServiceService } from 'src/app/Core/Services/DataTransfer/data-transfer-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Input properties to customize the component
  @Input() style = '';
  @Input() color = 'black';

  // Variables to control the search functionality and navigation
  SearchClick = false;
  searchText: string = '';
  CartItem = 0;
  searchSubject = new Subject<string>();
  NavId = 0;
  PrevId = 0;
  SubId = 0;
  PrevSubId = 0;
  ShowSubMenu: Boolean = false;
  prev: any = null;
  MobileMenu = true;
  NavOpen = false;
  elementToStyle: HTMLElement = document.createElement('strong');
  elementDDToStyle: HTMLElement = document.createElement('strong');

  isLoginUser: boolean = false;
  TryToLogin: boolean = false;

  constructor(
    private controller: ProductControllerService,
    private router: Router,
    private dataTransfer: DataTransferServiceService,
    private productService: ProductServiceService,
  ) {
    this.CartItem = 0;
  }

  // Listen for window resize events to detect mobile devices
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Update the screen width whenever the window is resized
    this.MobileMenu = window.innerWidth <= 768;
    // Call any other methods or update your component's logic based on the new screen width here
  }

  ngOnInit(): void {

    AuthServiceFunctionsService.isLogin.subscribe(
      (data: any) => {
        this.isLoginUser = data;
      }
    )
    AuthServiceFunctionsService.ClickToLogin.subscribe(
      (data: any) => {
        this.TryToLogin = data;
      }
    )

    this.dataTransfer.CartLength.subscribe(
      (data: any) => {
        this.CartItem = data;
      },
      (error) => {
        console.log(error);

      }
    );
    // Check if the component is running on a mobile device
    this.MobileMenu = (window.innerWidth <= 768);
    // Create a debounced search subject to avoid excessive API calls
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.search();
    });
  }

  // Perform a search operation
  search(): void {
    if (this.searchText) {
      this.controller.searchData(this.searchText);
      // this.router.navigateByUrl('/search-product')
    }
  }

  // Update the search text and emit the new value to the search subject
  getQuery(event: any) {
    this.searchText = event.target.value;
    this.searchSubject.next(this.searchText.trim());
  }

  // Toggle the visibility of the search bar
  openSearchBar(): void {
    this.SearchClick = !this.SearchClick;
  }

  // Listen for click events on the document
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    // Get the clicked target element
    const target = event.target as HTMLElement;

    // Get specific DOM elements
    const searchBar = document.getElementById('search-bar');
    const navLink = document.getElementById('nav-link');
    const sub_dropdown = document.getElementsByClassName('custom-h3');
    const homedropdown = document.getElementsByClassName("home-dropdown");
    const nav_open_button = document.getElementById('nav_open_button');
    const svgdropdown = document.getElementById('svgdropdown');


    // Logic for handling clicks on sub-dropdown elements
    let checkSubDRopDown: Boolean = false;
    for (let item of Array.from(sub_dropdown)) {
      if (item == event.target) {
        const currelementToStyle = item.children[0] as HTMLElement;
        checkSubDRopDown = true;
        const id = Number(item.id);
        if (this.SubId == id) {
          this.PrevSubId = this.SubId;
          this.SubId = 0;
          currelementToStyle.style.transform = "rotate(0deg)";
        } else if (this.SubId != id) {
          this.PrevSubId = this.SubId = id;
          this.elementDDToStyle.style.transform = "rotate(0deg)";
          currelementToStyle.style.transform = "rotate(90deg)";
          this.elementDDToStyle = currelementToStyle;
        } else this.SubId = 0;
        return;
      }
    }
    if (checkSubDRopDown == false) {
      this.SubId = 0;
    }

    // Logic for handling clicks on home-dropdown elements
    let checkHomeDropDown: Boolean = false;
    for (let item of Array.from(homedropdown)) {


      if (item == event.target) {
        checkHomeDropDown = true;
        const id = Number(item.id);
        if (this.MobileMenu) {
          const currelementToStyle = item.children[0] as HTMLElement;
          if (this.NavId == id) {
            this.PrevId = this.NavId;
            currelementToStyle.style.transform = "rotate(0deg)";
            this.NavId = 0;
          } else if (this.NavId != id) {
            this.PrevId = this.NavId = id;
            this.elementToStyle.style.transform = "rotate(0deg)";
            currelementToStyle.style.transform = "rotate(90deg)";
            this.elementToStyle = currelementToStyle;

          } else {
            this.NavId = 0;
          }
          return;
        }
        else {
          const link: string = String(target.getAttribute("link"));
          this.router.navigateByUrl(link);
        }

      }
    }
    if (checkHomeDropDown == false) {
      this.NavId = 0;
    }

    // Logic for closing the navigation when clicking outside the component
    if (this.NavOpen && !navLink?.contains(target) &&
      !nav_open_button?.contains(target) &&
      target.getAttribute('class')?.indexOf('lucide') == -1 &&
      target.parentElement?.getAttribute('class')?.indexOf('lucide') == -1
    ) {
      this.SubId = this.NavId = 0;
      this.NavOpen = false;
    }

    // Logic for hiding the search bar when clicking outside
    if (!searchBar?.contains(target) &&
      !this.isSvgElement(target)
    ) {
      this.SearchClick = false;
    }
  }

  // Check if the element is an SVG element
  isSvgElement(element: HTMLElement): boolean {
    return element instanceof SVGElement;
  }

  generateRouterLink(inputString: any[]) {

    let routeLink = ""
    this.NavId = 0;
    this.NavOpen = false;
    for (let item of inputString) {
      routeLink += item.toLowerCase() + "/";
    }
    routeLink = routeLink.slice(0, -1);
    this.productService.getProductData(true, String(AuthServiceFunctionsService.getAccessUserFromCookie()), routeLink)
    this.router.navigateByUrl(routeLink);
  }

  openNav(event: any) {
    if (this.NavOpen) {
      this.SubId = this.NavId = 0;
    }
    this.NavOpen = !this.NavOpen;
    this.SearchClick = false;
  }

  // Show the navigation with a specific ID
  showNav(id: any) {
    if (this.MobileMenu == false) {
      this.PrevId = this.NavId = id;
    }
  }

  // Hide the navigation
  hideNavbar() {
    this.NavId = 0;
  }

  closeAlert(){
    AuthServiceFunctionsService.ClickToLogin.next(false)
  }



  // dropdown data
  dropdownItems = DropDownItems
}