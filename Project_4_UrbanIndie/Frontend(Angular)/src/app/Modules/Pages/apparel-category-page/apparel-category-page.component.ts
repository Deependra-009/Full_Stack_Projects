import { Component, HostListener } from '@angular/core';
import { ProductServiceService } from 'src/app/Core/Ngrx/Product-Service/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthServiceFunctionsService } from 'src/app/Core/Authentication/AuthServiceFunctions/auth-service-functions.service';
import { FilterServiceService } from 'src/app/Core/Ngrx/Filter-Service/filter-service.service';

@Component({
  selector: 'app-apparel-category-page',
  templateUrl: './apparel-category-page.component.html',
  styleUrls: ['./apparel-category-page.component.css']
})
export class ApparelCategoryPageComponent {


  NavId = 0;
  PrevId = 0;
  elementToStyle: HTMLElement = document.createElement('strong');
  OpenNav = false;
  MobileMenu = false;
  isLoading = true;
  isLoaded = false;
  mySet: any = []
  filterOptions = new Map();
  Data = []
  private department: string | null = null;
  private apparelcategory: string | null = null;
  private producttype: string | null = null;
  departmentType: any = "";

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Update the screen width whenever the window is resized
    this.MobileMenu = window.innerWidth <= 1300;
    // Call any other methods or update your component's logic based on the new screen width here
  }


  constructor(
    private filterservice: FilterServiceService,
    private productservice: ProductServiceService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const arr = window.location.pathname;
    const url = window.location.pathname.slice(1);
    const split = arr.split("/");
    this.MobileMenu = window.innerWidth <= 1024;

    // loading observable
    this.productservice.getProductObservable()[1].subscribe(
      (data: any) => {
        this.isLoading = data;
        // console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

    // loaded observable
    this.productservice.getProductObservable()[2].subscribe(
      (data: any) => {
        this.isLoaded = data;
        // console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

    this.productservice.getProductObservable()[0].subscribe(
      (data: any) => {
        this.Data = data;
        // console.log(data);
      },
      (error) => {
        console.log(error);

      });






    this.route.url.subscribe((data) => {


      this.productservice.getApparelCategoryData(data[0].path, data[1].path).then(
        (data: any) => {
          console.log(data);
          this.mySet=data.apparelCategoryModelList;

        },
        (error) => {
          console.log(error);

        }
      )

      if (window.location.pathname != "/search-product") {
        this.departmentType = data[0].path;
      }
    });
    if (window.location.pathname != "/search-product") {
      if (split[1] != undefined) {
        var list: any = new Array();
        list.push(split[1]);
        this.filterOptions.set("departmentType", list);
      }
      if (split[2] != undefined) {
        var list: any = new Array();
        list.push(split[2]);
        this.filterOptions.set("apparelCategory", list);
      }
      if (split[3] != undefined) {
        var list: any = new Array();
        list.push(split[3]);
        this.filterOptions.set("productType", list);
      }
    }
    if (window.location.pathname != "/search-product") {
      this.productservice.getProductData(
        true,
        String(AuthServiceFunctionsService.getAccessUserFromCookie()),
        url
      );
    } else {
      this.productservice.getProductData(
        true,
        String(AuthServiceFunctionsService.getAccessUserFromCookie()),
        ""
      );
    }


  }

  getImage(str: String) {
    return str.split("$")[1];
  }
  getLabel(str: String) {
    return str.split("$")[0];
  }


  generateRouterLink(link: any) {


    // const inputString: any = []
    let routeLink = ""

    const currentUrl = this.location.path().slice(1, this.location.path().length) + "/" + link.category_name;


    this.productservice.getProductData(true, String(AuthServiceFunctionsService.getAccessUserFromCookie()), currentUrl)
    this.router.navigateByUrl(currentUrl);
  }

  openNavFunc() {
    this.OpenNav = !this.OpenNav;
  }
  closeNavFunc() {
    this.OpenNav = !this.OpenNav;
  }

  OpenSubBar(id: any, event: any) {
    const subbar = document.getElementsByClassName("sub-bar-class");
    // // Logic for handling clicks on sub-dropdown elements
    let checkSubDRopDown: Boolean = false;
    for (let item of Array.from(subbar)) {
      if (item == event.target) {
        const currelementToStyle = item.children[0] as HTMLElement;
        checkSubDRopDown = true;
        const id = Number(item.id);
        if (this.NavId == id) {
          this.PrevId = this.NavId;
          this.NavId = 0;
          currelementToStyle.style.transform = "rotate(0deg)";
        } else if (this.NavId != id) {
          this.PrevId = this.NavId = id;
          this.elementToStyle.style.transform = "rotate(0deg)";
          currelementToStyle.style.transform = "rotate(90deg)";
          this.elementToStyle = currelementToStyle;
        } else this.NavId = 0;
        return;
      }
    }



  }

  selectFilter(subId: any, subName: any) {
    if (this.filterOptions.has(subId)) {
      var list = this.filterOptions.get(subId);
      if (list.includes(subName) == false) {
        list.push(subName);
        this.filterOptions.set(subId, list);
      } else {
        list.splice(list.indexOf(subName), 1);
        if (list.length == 0) {
          this.filterOptions.delete(subId);
        }
      }
    } else {
      var list: any = new Array();
      list.push(subName);
      this.filterOptions.set(subId, list);
    }



    this.filterservice.getFilterProductData(
      true,
      String(AuthServiceFunctionsService.getAccessUserFromCookie()),
      this.filterOptions
    );
  }

  filterNames: Array<any> = [
    {
      id: "gender",
      name: "Gender",
      SubId: 1,
      subdata: [
        {
          id: "gender_male",
          name: "Male",
          select: false
        },
        {
          id: "gender_female",
          name: "Female",
          select: false
        },
      ]
    },
    {
      id: "discount",
      name: "Discount",
      SubId: 2,
      subdata: [
        {
          id: "discount_10",
          name: "10",
          select: false
        },
        {
          id: "discount_20",
          name: "20",
          select: false
        },
        {
          id: "discount_30",
          name: "30",
          select: false
        },
        {
          id: "discount_40",
          name: "40",
          select: false
        },
        {
          id: "discount_50",
          name: "50",
          select: false
        },
        {
          id: "discount_60",
          name: "60",
          select: false
        },
        {
          id: "discount_70",
          name: "70",
          select: false
        },
      ]
    },
    {
      id: "customerRatings",
      name: "Customer Ratings",
      SubId: 3,
      subdata: [
        {
          id: "rating_5",
          name: "5",
          select: false
        },
        {
          id: "rating_4",
          name: "4",
          select: false
        },
        {
          id: "rating_3",
          name: "3",
          select: false
        },
      ]
    },
    {
      id: "size",
      name: "Size",
      SubId: 4,
      subdata: [
        {
          id: "size_S",
          name: "S",
          select: false
        },
        {
          id: "size_M",
          name: "M",
          select: false
        },
        {
          id: "size_L",
          name: "L",
          select: false
        },
        {
          id: "size_XL",
          name: "XL",
          select: false
        },
        {
          id: "size_2XL",
          name: "2XL",
          select: false
        },
        {
          id: "size_3XL",
          name: "3XL",
          select: false
        }
      ]
    },
    {
      id: "brands",
      name: "Brands",
      SubId: 5,
      subdata: [
        {
          id: "brand_indian_garage",
          name: "The Indian Garage Co.",
          select: false
        },
        // ... (remaining items)
      ]
    },
    {
      id: "sleeves",
      name: "Sleeves",
      SubId: 6,
      subdata: [
        {
          id: "sleeve_full",
          name: "Full Sleeves",
          select: false
        },
        // ... (remaining items)
      ]
    },
    {
      id: "availability",
      name: "AVAILABILITY",
      SubId: 7,
      subdata: [
        {
          id: "availability_out_of_stock",
          name: "Include Out of Stock",
          select: false
        }
      ]
    },
  ];


}
