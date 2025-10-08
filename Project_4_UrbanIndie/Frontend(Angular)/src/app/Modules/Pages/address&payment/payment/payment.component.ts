import { Component  } from '@angular/core';
import { paymentOption } from '../../../../Core/Constant_Data/paymentOptions';
import { buttons } from './buttonsConstantData';
import { SvgSanitizerService } from '../../../../Core/Services/SanitizedSvg/svg-sanitizer.service';
import { Router } from '@angular/router';
import { DataTransferServiceService } from 'src/app/Core/Services/DataTransfer/data-transfer-service.service';
import { AuthServiceFunctionsService } from 'src/app/Core/Authentication/AuthServiceFunctions/auth-service-functions.service';


interface UpiFormData {
  upiId: string;
  saveUpi: boolean;
}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  isAddAddress:any;
  paymentOptions= paymentOption;
  selectedOptions: any[] = [];
  buttons=buttons;
  selectedFormOption: any = null;
  selectedPaymentOption: any = null;
  whichCategorySelected:String='';
  upiFormData: UpiFormData= {
    upiId: '',
    saveUpi: false
  }

  cardDetailsFormData:any={
    cardNumber:'',
    nameOnCard:'',
    cvv:'',
    validThru:'',
  }


  gpayFormData:any= {
    upiId: '',
    selectedUpiOption: '@okhdfcbank'
  }
  constructor(public svgSanitizer: SvgSanitizerService,
    private router: Router,
    private datatransfer: DataTransferServiceService,
    ) {}
  selectPaymentOption(option: any) {
    // this.selectedPaymentOption = option;
    // console.log(option);

    this.selectedPaymentOption = {
      // id: option.id,
      // name: option.name,
      user_id:String(AuthServiceFunctionsService.getAccessUserFromCookie()),
      val: option.value,
      // recommended: option.recommended,
    };

    if (this.selectedPaymentOption) {
      this.datatransfer.setPaymentData(this.selectedPaymentOption);
    } else {
    }
    // Reset the form display when a new payment option is selected
    this.selectedFormOption = null;
  }
  submitEnterUpiIdForm() {
  }
  submitGpayUpiForm(){
    const upiIdWithSelectedOption = this.gpayFormData.upiId + this.gpayFormData.selectedUpiOption;
  }

  submitCardDetailsForm(){

  }
  ngOnInit(): void {
    if (this.selectedOptions.length === 0) {
      this.selectedOptions = this.paymentOptions.recommended;
      this.whichCategorySelected='recommended';
    }


  }

}

