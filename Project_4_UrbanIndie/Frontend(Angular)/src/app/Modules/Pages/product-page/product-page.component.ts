import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceFunctionsService } from 'src/app/Core/Authentication/AuthServiceFunctions/auth-service-functions.service';
import { DataTransferServiceService } from 'src/app/Core/Services/DataTransfer/data-transfer-service.service';
import { SharedFunctionsService } from 'src/app/Core/Services/SharedFunctions/shared-functions.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  mobile:boolean=false;

  ShowData={
    best_offers:false,
    product_details:false,
    model_details:false,
    product_description:false
  }
  
  @HostListener('window:resize',['$event'])
  onResize(event:Event){
    this.mobile=window.innerWidth<=1280;
  }

  constructor(
    private sharedfunction:SharedFunctionsService,
    private dataTransfer:DataTransferServiceService,
    private authService:AuthServiceFunctionsService,
    private router:Router,
    private toastr:ToastrService,
  ) { }

  showDataFunc(tag:String){
    if(this.mobile==false) return;
    switch(tag){
      case "best_offers":this.ShowData.best_offers=!this.ShowData.best_offers;
      break;
      case "model_details": this.ShowData.model_details=!this.ShowData.model_details;
      break;
      case "product_details":this.ShowData.product_details=!this.ShowData.product_details;
      break;
      case "product_description":this.ShowData.product_description=!this.ShowData.product_description;
      break;
    }
  }


  ngOnInit(): void {
    this.mobile=window.innerWidth<=1280;
    const product_data=this.dataTransfer.getSelectProductData();
    if(product_data!=null){
      this.ProductData=product_data;
    }
  }

  addToBag(event:any){
    const url = window.location.pathname;
    event.stopPropagation();

    if(this.authService.ifUserLoggedIn()==false){
      this.toastr.info('Error!!', 'Please login first...', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',

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
      this.sharedfunction.addToCart(this.ProductData,event);
    }
  }

  addToFavourite(event:any){
    const url = window.location.pathname;
    event.stopPropagation();

    if(this.authService.ifUserLoggedIn()==false){
      this.toastr.info('Error!!', 'Please login first...', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',

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
      this.sharedfunction.addToFavorites(this.ProductData,event);
    }
    
  }


  ProductData={
    "product_id": "6071cacb-6d58-4a0a-8b57-5a8975a0ddfd",
    "product_usin": "YJHQDH5BBGXF0N6",
    "product_mrp": "463",
    "product_discount": 55,
    "product_title": "Men Solid Black T-shirt",
    "product_price": "299",
    "product_brand": "ClassicWear",
    "apparelCategory": "topwear",
    "productType": "t-shirts",
    "product_total_rating": "1.7k",
    "product_average_rating": 4.2,
    "product_seller_id": "",
    "product_status": "AVAILABLE",
    "departmentType": "men",
    "product_description": "",
    "addInWishList": false,
    "addInCart": false,
    "product_images": [
      "https://drive.google.com/uc?id=1zqQoCKwbWFvx3dk4EBDy-KQ8okF3-Vjs",
      "https://drive.google.com/uc?id=1cXucboljLn8zzpLW-eDW_zeOWugOE9xM",
      "https://drive.google.com/uc?id=1pu_QvYDvIFXxEyMQcNk6sTGMxVmbHtbl",
      "https://drive.google.com/uc?id=1OpEtMSowfUhs2-c0egTZUPiurl6L9CpU"
    ],
    "product_color": [
      "Black"
    ],
    "product_size": [
      "S",
      "XL",
      "L",
      "M",
      "XXL"
    ],
    "model_details": [
      "Material: Premium quality cotton fabric",
      "Solid black color",
      "Warranty provided by brand owner/manufacturer",
      "Classic round neck design"
    ],
    "product_reviews": [
      {
        "user_name": "Rahul Gupta",
        "rating": "4",
        "title": "",
        "body": "Good quality t-shirt. Fits perfectly!",
        "date": "9 September 2022"
      }
    ],
    "product_details": [
      "Wash Care: Machine Wash",
      "Fit: Regular Fit",
      "Fabric: Cotton",
      "Sleeve: Short Sleeve"
    ],
    "delievery_options": [],
    "product_tags": [
      "solid",
      "men",
      "black",
      "t-shirt"
    ]
  }

  Data: any = [
    {
      img: "bg-bg-img",
      title: "Khakis Bleached Denim Trucker Jacket"
    },
    {
      img: "bg-bg-img",
      title: "New Men’s collection for the summer 23"
    },
    {
      img: "bg-bg-img",
      title: "New Men’s collection for the summer 23"
    },
    {
      img: "bg-bg-img",
      title: "New Men’s collection for the summer 23"
    },
    {
      img: "bg-bg-img",
      title: "New Men’s collection for the summer 23"
    },
    {
      img: "bg-bg-img",
      title: "New Men’s collection for the summer 23"
    },
    {
      img: "bg-bg-img",
      title: "New Men’s collection for the summer 23"
    },
    {
      img: "bg-bg-img",
      title: "New Men’s collection for the summer 23"
    },
  ]


}
