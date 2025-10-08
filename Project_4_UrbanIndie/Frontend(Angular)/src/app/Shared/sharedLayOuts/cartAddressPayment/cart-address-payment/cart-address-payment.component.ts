import { Component } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { DataTransferServiceService } from "src/app/Core/Services/DataTransfer/data-transfer-service.service";
import { OrderService } from "src/app/Core/Services/ControllerService/OrderService/order.service";
import { OrderResponseService } from "src/app/Core/Services/ControllerService/OrderService/order-response.service";
import { SharedFunctionsService } from "src/app/Core/Services/SharedFunctions/shared-functions.service";
import { AuthServiceFunctionsService } from "src/app/Core/Authentication/AuthServiceFunctions/auth-service-functions.service";

interface OrderData {
  paymentOption: any;
  cartData: any;
  addressData: any;
}
@Component({
  selector: "app-cart-address-payment",
  templateUrl: "./cart-address-payment.component.html",
  styleUrls: ["./cart-address-payment.component.css"],
})
export class CartAddressPaymentComponent {
  currentComponentRoute: string = "";
  length = 0;
  products: any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datatransfer: DataTransferServiceService,
    private orderService: OrderService,
    private sharedfunction: SharedFunctionsService,
    private orderResponseService: OrderResponseService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentComponentRoute =
          this.activatedRoute.firstChild?.snapshot.routeConfig?.path || "";
      }
    });
  }
  ngOnInit() {
    this.datatransfer.CartLength.subscribe((data: any) => {
      this.length = data;
    });
  }
  clearBag() {
    this.sharedfunction.removeAllProductFromCart();
  }
  getDynamicRouteforContinueButton(): string | null {
    if (this.currentComponentRoute === "payment-page") {
      return null;
    } else {
      switch (this.currentComponentRoute) {
        case "cart-page":
          return "/order/address-page";
        case "address-page":
          return "/order/payment-page";
        case "payment-page":
          return "/user/order-page";
        default:
          return "/test";
      }
    }
  }

  getDynamicRouteForBackButton(): string {
    switch (this.currentComponentRoute) {
      case "address-page":
        return "/order/cart-page";
      case "payment-page":
        return "/order/address-page";
      default:
        return "";
    }
  }

  orderData: OrderData = {
    paymentOption: null,
    cartData: null,
    addressData: null,
  };
  handleFormSubmission(): void {
    this.orderData.paymentOption = this.datatransfer.getPaymentData();
    this.orderData.cartData = this.datatransfer.getCartData();
    this.orderData.addressData = this.datatransfer.getAddressData();
    if (
      this.orderData.paymentOption === null ||
      this.orderData.cartData === null ||
      this.orderData.addressData === null
    ) {
      console.error("Some required data is missing");
      return;
    }

    const requestData = {
      user_id: String(AuthServiceFunctionsService.getAccessUserFromCookie()),
      payment_mode: this.orderData.paymentOption.val,
      address: {
        name: this.orderData.addressData.name,
        addressType: this.orderData.addressData.addressType,
        addressLine1: this.orderData.addressData.addressLine1,
        addressCity: this.orderData.addressData.addressCity,
        addressState: this.orderData.addressData.addressState,
        addressPinCode: this.orderData.addressData.addressPinCode,
        mobileNumber: this.orderData.addressData.mobileNumber,
        expectedDeliveryDate: this.orderData.addressData.expectedDeliveryDate,
      },
      // order_total_amount: this.orderData.cartData.totalPrice,
      order_products: this.orderData.cartData.map((product: any) => {
        return {
          product_id: product.product_id,
          product_quantity: product.product_quantity,
          product_price: product.product_price,
          product_discount: product.product_discount,
          product_colour: product.selectedProductColour,
          product_size: product.selectedProductSize,
        };
      }),
    };
    // this.orderService.testplaceOrder(requestData);
    this.orderService.placeOrder(requestData).subscribe({
      next: (response) => {
        // Handle successful response
        this.clearBag();
        this.orderResponseService.setOrderResponse(response);
        this.router.navigate(["/current-order-status"]);
      },
      error: (error) => {
        // Handle error response
        console.error("Error placing order:", error);
      },
    });
  }
}
