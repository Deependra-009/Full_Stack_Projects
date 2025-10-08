import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthServiceFunctionsService } from 'src/app/Core/Authentication/AuthServiceFunctions/auth-service-functions.service';
import { DataTransferServiceService } from 'src/app/Core/Services/DataTransfer/data-transfer-service.service';
import { SharedFunctionsService } from 'src/app/Core/Services/SharedFunctions/shared-functions.service';
import { ProductModal } from 'src/app/Shared/Modals/ProductModal';

@Component({
  selector: 'app-product-card3',
  templateUrl: './product-card3.component.html',
  styleUrls: ['./product-card3.component.css']
})
export class ProductCard3Component implements OnInit {
  @Input() Data: ProductModal[] = [];
  @Input() isFavPage: Boolean = false;
  @Input() grid_style = "";
  @Input() border_style = "";
  @Input() page_title = "";
  @Input() image_card_style = "";
  @Input() style_class = "";
  @Input() mobileView: boolean = false;

  CurrentUrl="/";

  imageLoaded = false;

  
  
  searchText = "";
  isLoading = true;

  public constructor(
    private dataTransfer:DataTransferServiceService,
    private router:Router,
    private sharedfunction:SharedFunctionsService,
    private authService:AuthServiceFunctionsService,
    private toastr:ToastrService,
    private cdr: ChangeDetectorRef
    
  ) { 

   
  }

  onImageLoad() {
    // This function will be called when the image is successfully loaded
    this.imageLoaded = true;
    this.cdr.detectChanges(); // Trigger change detection
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1495);
  
    this.dataTransfer.SearchQuery.subscribe((data) => {
      this.searchText = data;
      
    })
  }

  
  addToFavorites(item: any,event:any) {

    const url = window.location.pathname;
    event.stopPropagation();

    if(this.authService.ifUserLoggedIn()==false){
      this.toastr.info('Error!!', 'Please login first...', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
        positionClass:'toast-top-center'

      });
      AuthServiceFunctionsService.login_path.next(url)
      this.router.navigateByUrl('/login');    
      return;
    }
    else{
      this.toastr.success('', 'Product Add Successfully', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
        positionClass:'toast-top-center'

      });
      this.sharedfunction.addToFavorites(item,event)
    }
  }
  goToProductPage(item:any){
    this.dataTransfer.setSelectProductData(item);
    this.router.navigateByUrl('/product-page');    
  }



}
