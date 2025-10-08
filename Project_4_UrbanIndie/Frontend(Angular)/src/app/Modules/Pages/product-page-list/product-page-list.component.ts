import { Component, HostListener, OnInit } from "@angular/core";
import { ProductModal } from "src/app/Shared/Modals/ProductModal";
import { SideNavData } from "../../../Core/Constant_Data/SideNavData";
import { ProductServiceService } from "src/app/Core/Ngrx/Product-Service/product-service.service";
import { FilterServiceService } from "src/app/Core/Ngrx/Filter-Service/filter-service.service";
import { ActivatedRoute } from "@angular/router";
import { AuthServiceFunctionsService } from "src/app/Core/Authentication/AuthServiceFunctions/auth-service-functions.service";
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataTransferServiceService } from "src/app/Core/Services/DataTransfer/data-transfer-service.service";
import { ProductControllerService } from "src/app/Core/Services/ControllerService/ProductService/product-controller.service";

type SortingOption = "popularity" | "lowToHigh" | "highToLow" | "newestFirst";
@Component({
  selector: "app-product-page-list",
  templateUrl: "./product-page-list.component.html",
  styleUrls: ["./product-page-list.component.css"],
})
export class ProductPageListComponent implements OnInit {
  filterNames: Array<any> = SideNavData;
  NavId = 0;
  PrevId = 0;
  elementToStyle: HTMLElement = document.createElement("strong");
  OpenNav = false;
  MobileMenu = false;
  Data: ProductModal[] = [];
  departmentType: any = "";
  isLoading: boolean = true;
  isLoaded: boolean = false;
  filterOptions = new Map();
  private department: string | null = null;
  private apparelcategory: string | null = null;
  private producttype: string | null = null;
  previousScrollPosition = 0;
  page: number = 0;
  itemsPerPage: number = 20;
  loading: boolean = false;
  spineeractive: boolean = false;
  isLastPage: boolean = false
  private noMoreData: boolean = false;
  @HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    this.MobileMenu = window.innerWidth <= 1300;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    fromEvent(window, 'scroll')
      .pipe(debounceTime(300))
      .subscribe(() => {
        if (this.shouldLoadData() && this.shouldLoadData() && !this.loading && !this.isLastPage) {
          this.loadMoreProducts();
        }
      });
  }

  shouldLoadData(): boolean {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.offsetHeight;
    return scrollY + windowHeight >= documentHeight;
  }

  loadMoreProducts(): void {
    this.spineeractive = true;
    this.loading = true;
    this.page++;

    this.productservice.getMoreProducts(
      this.page,
      this.itemsPerPage,
      this.departmentType,
      this.apparelcategory,
      this.producttype
    ).subscribe(
      (result: { data: ProductModal[], code: number }) => {
        if (result.code === 204 || result.code === 206) {
          this.noMoreData = true;
          // this.spineeractive = false;
          // this.isLastPage = true;
        }
        else {
          this.Data = [...this.Data, ...result.data];
          this.loading = false;
          // this.spineeractive = false;
        }

      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }


  constructor(
    private productservice: ProductServiceService,
    private filterservice: FilterServiceService,
    private route: ActivatedRoute,
    private dataTransfer: DataTransferServiceService,
    private productcontroller: ProductControllerService
  ) { }
  ngOnInit(): void {
    const arr = window.location.pathname;
    const url = window.location.pathname.slice(1);
    const split = arr.split("/");

    this.route.url.subscribe((data) => {

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
    this.retrieveRouteParameters();

    // this.Data=demodata;
    this.MobileMenu = window.innerWidth <= 1024;
    this.productservice.getProductObservable()[1].subscribe((data: any) => {
      this.isLoading = data;
    });
    this.productservice.getProductObservable()[2].subscribe((data: any) => {
      this.isLoaded = data;
    });

    if (window.location.pathname != "/search-product") {


      this.productservice.getProductData(
        true,
        String(AuthServiceFunctionsService.getAccessUserFromCookie()),
        url
      );
    } else {
      this.isLoading = true;
      this.isLoaded = false;
      setTimeout(() => {
        let text = DataTransferServiceService.getSearchText();

        if (text == null) {
          text = "";
          this.productcontroller.searchData(text);
        }
        else {
          this.productcontroller.searchData(text);
        }
        this.isLoading = true;
        this.isLoaded = false;
      }, 3000);
    }

    this.productservice.getProductObservable()[0].subscribe(
      (data: ProductModal[]) => {
        this.Data = data;
        if (this.dataTransfer.getSpinner()) {
          this.isLastPage = true;
          this.spineeractive = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  private retrieveRouteParameters(): void {
    this.department = this.route.snapshot.paramMap.get('department');
    this.apparelcategory = this.route.snapshot.paramMap.get('apparelcategory');
    this.producttype = this.route.snapshot.paramMap.get('producttype');
  }
  openNavFunc() {
    this.OpenNav = !this.OpenNav;
  }
  closeNavFunc() {
    this.OpenNav = !this.OpenNav;
  }

  OpenSubBar(id: any, event: any) {
    const subbar = document.getElementsByClassName("sub-bar-class");
    let checkSubDRopDown: Boolean = false;
    for (let item of Array.from(subbar)) {
      if (item == event.target) {
        const currelementToStyle = item.children[0] as HTMLElement;
        checkSubDRopDown = false;
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
    const key = subId + ":" + subName;

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
  sortingOptions: {
    [key in SortingOption]: (a: ProductModal, b: ProductModal) => number;
  } = {
      popularity: (a: ProductModal, b: ProductModal) =>
        +b.product_average_rating - +a.product_average_rating,
      lowToHigh: (a: ProductModal, b: ProductModal) =>
        +a.product_price - +b.product_price,
      highToLow: (a: ProductModal, b: ProductModal) =>
        +b.product_price - +a.product_price,
      newestFirst: (a: ProductModal, b: ProductModal) =>
        +a.product_price - +b.product_price,
    };

  onSortOptionSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement)
      .value as SortingOption;
    this.sortData(selectedValue);
  }

  sortData(sortOption: SortingOption): void {
    const sortingFunction = this.sortingOptions[sortOption];
    if (sortingFunction) {
      this.Data = [...this.Data];
      this.Data.sort(sortingFunction);
    }
  }
}
