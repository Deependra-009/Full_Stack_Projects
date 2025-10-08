import { Component, HostListener, OnInit, ElementRef, QueryList, ViewChildren, Renderer2 } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CartApiGatewayService } from 'src/app/Core/APIGateway/CartAPIGateway/cart-api-gateway.service';
import { CartServiceService } from 'src/app/Core/Ngrx/Cart-Service/cart-service.service';
import {  CartListChangeSpecifications} from 'src/app/Core/Ngrx/Ngrx-Functions/Actions/Cart/CartAction';
import { RootReducerState } from 'src/app/Core/Ngrx/Ngrx-Functions/Reducers';
import { ProductServiceService } from 'src/app/Core/Ngrx/Product-Service/product-service.service';
import { DataTransferServiceService } from 'src/app/Core/Services/DataTransfer/data-transfer-service.service';
import { WishListService } from 'src/app/Core/Ngrx/WishList-Service/wish-list.service';
import { ProductModal } from 'src/app/Shared/Modals/ProductModal';
import { SharedFunctionsService } from 'src/app/Core/Services/SharedFunctions/shared-functions.service';
import { AuthServiceFunctionsService } from 'src/app/Core/Authentication/AuthServiceFunctions/auth-service-functions.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  providers: [
    FormsModule,
    NgModule
  ]
})
export class CartPageComponent implements OnInit {
  Data: ProductModal[] = [];
  SubId = 'a';
  PrevSubId = 'a';
  isList: any;
  CartData: any = [];
  length = 0;
  WishListData: any = [];
  isFavPage: Boolean = false;
  flashProductId: string | null = null;
  @ViewChildren('productElement') productElements!: QueryList<ElementRef>;
  constructor(
    private cart: CartServiceService,
    private store: Store<RootReducerState>,
    private cartapi: CartApiGatewayService,
    private wishList: WishListService,
    private productservice: ProductServiceService,
    private datatransfer: DataTransferServiceService,
    private sharedfunction:SharedFunctionsService,
    private el: ElementRef, private renderer: Renderer2
  ) {
    this.length = 0;
  }

  // Function to start the flashing effect
  startFlashing() {
    this.renderer.addClass(this.el.nativeElement, 'flasher');
  }

  // Function to stop the flashing effect
  stopFlashing() {
    this.renderer.removeClass(this.el.nativeElement, 'flasher');
  }
  ngOnInit(): void {

    this.wishList.getWishListObservable()[0].subscribe(
      (data: any) => {
        this.WishListData = data;
      },
      (error) => {
        console.log(error);

      }
    )

    this.productservice.getProductObservable()[0].subscribe(
      (data: ProductModal[]) => {
        this.Data = data;
      },
      (error) => {
        console.log(error);

      }
    )
    this.getCartData();
    this.datatransfer.onContinueButtonClick().subscribe((pid: string | null) => {
      if (pid !== null) {
        this.handleContinueButtonClick(pid);
      }
    });
  }
  getCartData() {
    this.cart.getCartObservable()[0].subscribe(
      (data: any) => {
        if (data !== undefined) {
          try {
            this.CartData = JSON.parse(JSON.stringify(data.products));
            // this.calculateTotals();
          } catch (error) {
            // console.error('Error parsing JSON:', error);
          }
        } else {
          // console.error('Data is undefined or null');
        }

        // this.CartData = data.products;

        const result = this.isAnyProductIncomplete();
        this.datatransfer.updateIncompleteProductInfo(result);
        const modifiedProducts = data.products.map((product: any) => {
          return {
            product_id: product.product_id,
            product_price: product.product_price,
            product_discount: product.product_discount,
            product_quantity: product.product_quantity,
            selectedProductSize: product.selectedProductSize,
            selectedProductColour:product.selectedProductColour,
            product_mrp: product.product_mrp
          };
        });
        this.datatransfer.setCartData(modifiedProducts);
        // this.calculateTotals();
      },
      (error) => {
        console.log(error);
      }

    );
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdown = document.getElementsByClassName('cdd');
    let checkSubDRopDown: Boolean = false;
    for (let item of Array.from(dropdown)) {
      if (item.contains(target)) {
        const currelementToStyle = item.children[0] as HTMLElement;
        checkSubDRopDown = true;
        const id = item.id;
        if (this.SubId == id) {
          this.PrevSubId = this.SubId;
          this.SubId = '';
        } else if (this.SubId != id) {
          this.PrevSubId = this.SubId = id;
        } else this.SubId = '';
        return;
      }
    }
    if (checkSubDRopDown == false) {
      this.SubId = '';
    }
  }
  optionData = ['1', '2', '3', '4', '5', '6'];


  onRemoveFromBag(productId: string) {
    this.sharedfunction.removeFromCart(productId);
  }

  //this function is checking is there any product who doesnt have any colour selected or any size selected
  isAnyProductIncomplete(): { incomplete: boolean, productId: string | null } {
    for (const product of this.CartData) {
      if (
        (!product.selectedProductSize || product.selectedProductSize === "null") ||
        (!product.selectedProductColour || product.selectedProductColour === "null")
      ) {
        return { incomplete: true, productId: product.product_id };
      }
    }
    return { incomplete: false, productId: null };
  }


  onSpecChange(item: any) {
    const { product_id, selectedProductColour, selectedProductSize, product_quantity } = item;
    this.updateProductspecifications(product_quantity, product_id, selectedProductColour, selectedProductSize);
  }
  updateProductspecifications(quantity: string, product_id: string, color?: string, size?: string) {
    const user_id = String(AuthServiceFunctionsService.getAccessUserFromCookie());

    this.cartapi
      .updateProductspecifications(user_id, product_id, quantity, color, size)
      .subscribe(
        (res) => {
          this.store.dispatch(
            new CartListChangeSpecifications({
              quantity: quantity,
              product_id: product_id,
              selectedProductColour: color,
              selectedProductSize: size,
            })
          );
          // this.calculateTotals();
          const result = this.isAnyProductIncomplete();
          // console.log("updated result", result);
          this.datatransfer.updateIncompleteProductInfo(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  scrollToCartItemByProductId(productId: string) {
    const index = this.CartData.findIndex((item: { product_id: string }) => item.product_id === productId);

    if (index !== -1) {
      const productElement = this.productElements.toArray()[index];

      if (productElement) {
        if (productElement.nativeElement) {
          productElement.nativeElement.scrollIntoView({  block: 'start', inline: 'nearest', duration: 1000  });

        } else {
          console.error("productElement.nativeElement is undefined");
        }
      } else {
        console.error("productElement is undefined");
      }
    }
  }

  handleContinueButtonClick(pid: string): void {
    this.flashProductId = pid;
    this.scrollToCartItemByProductId(pid);
  }

}