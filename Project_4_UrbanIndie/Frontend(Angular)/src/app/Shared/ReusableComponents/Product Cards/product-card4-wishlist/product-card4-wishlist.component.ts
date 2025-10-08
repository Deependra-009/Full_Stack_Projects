import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/Core/Ngrx/WishList-Service/wish-list.service';
import { DataTransferServiceService } from 'src/app/Core/Services/DataTransfer/data-transfer-service.service';
import { SharedFunctionsService } from 'src/app/Core/Services/SharedFunctions/shared-functions.service';
import { ProductModal } from 'src/app/Shared/Modals/ProductModal';

@Component({
  selector: 'app-product-card4-wishlist',
  templateUrl: './product-card4-wishlist.component.html',
  styleUrls: ['./product-card4-wishlist.component.css']
})
export class ProductCard4WishlistComponent {
  @Input() Data: ProductModal[] = [];
  @Input() isFavPage: Boolean = false;
  @Input() grid_style = "";
  @Input() border_style = "";
  @Input() page_title = "";
  @Input() image_card_style = "";
  @Input() style_class = "";

  WishListData: any = []

  searchText = "";

  public constructor(
    private service: DataTransferServiceService,
    private wishList: WishListService,
    private dataTransfer: DataTransferServiceService,
    private router: Router,
    private sharedfunction:SharedFunctionsService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.service.SearchQuery.subscribe((data) => {
      this.searchText = data;
    })
    this.wishList.getWishListObservable()[0].subscribe(
      (data: any) => {
        this.WishListData = data;
      },
      (error) => {
        console.log(error);

      }
    )
  }

  addToCart(item: any, event: any,) {
    this.toastr.success('', 'Product Add Successfully', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass:'toast-top-center'

    });
    this.sharedfunction.addToCart(item, event);
  }

  removeFromFavorites(item: any, event: any) {
    this.sharedfunction.removeFromFavorites(item, event,this.isFavPage);
  }
  goToProductPage(item: any) {
    this.dataTransfer.setSelectProductData(item);
    this.router.navigateByUrl('/product-page');

  }


}
