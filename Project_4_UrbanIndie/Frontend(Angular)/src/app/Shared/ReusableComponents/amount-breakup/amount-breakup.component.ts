import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataTransferServiceService } from 'src/app/Core/Services/DataTransfer/data-transfer-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-amount-breakup',
  templateUrl: './amount-breakup.component.html',
  styleUrls: ['./amount-breakup.component.css']
})
export class AmountBreakupComponent {
  isList:any;
  pid: string= '';
  isCartPage:boolean=false;
  isContinueDisabled: boolean = false;
  @Input() dynamic_route: string | null = '';


  totalMRP: number = 0;

  totalPrice: number = 0;

  totalDiscount:number=0;

  @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();

  public continueButtonClick: EventEmitter<string> = new EventEmitter<string>();



  constructor(private router: Router,private dataTransfer:DataTransferServiceService) {}



  ngOnInit(): void {
   this.onRender();
   this.subscribeToTotalMRP();
   this.subscribeToTotalDiscount();
   this.subscribeToTotalPrice();
   window.addEventListener('beforeunload', (event) => {
    this.checkAndNavigateToCartPageOnRefresh(event);
  });
  }


async onRender(){
  this.dataTransfer.incompleteProductInfo$.subscribe((info) => {
    this.isContinueDisabled = info.incomplete && this.router.url.includes('cart-page');
   if( this.router.url.includes('cart-page')){
    this.pid = info.productId as string;
    this.isCartPage=true;
   }
  });
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.checkAndNavigateToCartPage();
      this.updateIsContinueDisabled();
    }
  });
}



checkAndNavigateToCartPage(): void {
  if (this.totalMRP === 0 || this.totalPrice === 0 || this.totalDiscount === 0) {
    // console.log("line ");
    // this.router.navigate(['/order/cart-page']);
  }
}
checkAndNavigateToCartPageOnRefresh(event: BeforeUnloadEvent): void {
  if (this.totalMRP === 0 || this.totalPrice === 0 || this.totalDiscount === 0) {
    // Prevent the default browser confirmation dialog
    event.preventDefault();
    // Set a custom message for confirmation (optional)
    event.returnValue = 'Your cart contains items with zero values. Are you sure you want to leave?';
    // Navigate to the cart page
    this.router.navigate(['/order/cart-page']);
  }
}
  updateIsContinueDisabled(): void {
    const isCartPage = this.router.url.includes('cart-page');
    const isAddressPage = this.router.url.includes('address-page');
    const isPaymentPage = this.router.url.includes('payment-page');


    if (isCartPage) {
      this. isCartPage=true;
    } else if (isAddressPage) {
      this.dataTransfer.addressSelected$.subscribe((selected) => {
       this.isCartPage=false;
        this.isContinueDisabled = !selected;
      });
    } else if (isPaymentPage) {
      this.dataTransfer.addressSelected$.subscribe((addressSelected) => {
        this.dataTransfer.paymentSelected$.subscribe((paymentSelected) => {
          this.isContinueDisabled = !addressSelected || !paymentSelected;
        });
      });
    }
  }
  onButtonClick(): void {
    if (this.router.url.includes('payment-page')) {
      this.submitForm.emit();
    }
  }

  onContinueButtonClick(): void {
    if (this.router.url.includes('cart-page')) {
      this.dataTransfer.emitContinueButtonClick(this.pid);
      this.isCartPage=false;
      Swal.fire({
        title: 'Please select size or color for the product',
        position: 'top-end',
        icon: 'info',
        showConfirmButton: false,
        timer: 1000
      });
    }
    if (this.router.url.includes('address-page')) {
      Swal.fire({
        title: 'Please select the Address',
        position: 'top-end',
        icon: 'info',
        showConfirmButton: false,
        timer: 1000
      });
    }
  }


  subscribeToTotalMRP() {
    this.dataTransfer.totalMRPObservable.subscribe((totalMRP) => {
      this.totalMRP = totalMRP;
    });
  }

  subscribeToTotalDiscount() {
    this.dataTransfer.totalDiscountObservable.subscribe((totalDiscount) => {
      this.totalDiscount = totalDiscount;
    });
  }

  subscribeToTotalPrice() {
    this.dataTransfer.totalPriceObservable.subscribe((totalPrice) => {
      this.totalPrice = totalPrice;
    });

  }
}
