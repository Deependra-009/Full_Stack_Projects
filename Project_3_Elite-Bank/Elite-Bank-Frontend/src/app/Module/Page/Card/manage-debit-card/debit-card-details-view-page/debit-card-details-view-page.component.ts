import { Component, Input, OnInit } from '@angular/core';
import { DebitCardSideNavData } from 'src/app/Core/Constant/CardSideNavData';
import { PageData } from 'src/app/Core/Constant/PageData';
import { DataTransferService } from '../../../../../Core/Ngrx Function/Services/DataTransfer/data-transfer.service';
import { LoginDetailsService } from 'src/app/Core/Ngrx Function/Services/LoginDetailsService/login-details.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { DebitCardController } from 'src/app/URL';
import { DebitCardControllerService } from '../../../../../Core/Controller/DebitCard/debit-card-controller.service';
import { UserDataServiceService } from 'src/app/Core/Ngrx Function/Services/UserDataService/user-data-service.service';

@Component({
  selector: 'app-debit-card-details-view-page',
  templateUrl: './debit-card-details-view-page.component.html',
  styleUrls: ['./debit-card-details-view-page.component.css'],
})
export class DebitCardDetailsViewPageComponent implements OnInit {
  CardSideNavData = DebitCardSideNavData;
  PageData = PageData;
  SubNavDataID = '';
  SelectSubNavDataID = 'debit-card-status';
  ShowCardData = false;
  AccountNumber:any="";
  SelectedDebitCard: any = {
    card_name: '',
    card_type: '',
    card_number: '',
    expiryDate: '',
    active: '',
    cvv: 'XXX',
  };
  SelectedUpgradeDebitCard:any={
    id:'',
    name:'',
    fee:'',
    benefit:'',
    checkedTC:false
  }

  UpgradeCardTab={
    tab:1,
    loading:true
  }
  DebitCardHotlistingTab={
    tab:1,
    loading:true,
    reason:'',
    remarks:''
  }

  InstantPinGenerationTab={
    tab:1,
    loading:true,
    pin:'',
    re_pin:'',

  }





  constructor(
    private dataTransferService: DataTransferService,
    private toastr: ToastrService,
    private debitCardController:DebitCardControllerService,
    private userService:UserDataServiceService,
  ) {}

  ngOnInit(): void {
    Object.assign(this.SelectedDebitCard, this.tempSelectedDebitCard);
    this.dataTransferService.SelectDebitCardData.subscribe((data: any) => {
      Object.assign(this.SelectedDebitCard, data);
    });
    console.log(this.SelectedDebitCard);


    // -------- Get Account Number --------

    this.AccountNumber = this.userService.getAccountNo();
    this.userService.AccountNo.subscribe(
      (data: String) => {
        this.AccountNumber = String(data);
      },
      (error) => {
        console.log(error);

      }
    );

  }

  // -------- Show Nav Data --------

  showSubNavData(id: string) {
    if (id == this.SubNavDataID) {
      this.SubNavDataID = '';
      return;
    }
    this.SubNavDataID = id;
  }

  // -------- Show Select Nav Data --------
  showSelectSubNavDataID(subitem: any, tabid: number) {
    if (tabid == 0) {
      this.SelectSubNavDataID = 'debit-card-status';
      this.SubNavDataID = '';
      return;
    }

    if (!subitem.active) return;

    this.SelectSubNavDataID = subitem.id;
  }


  enterPinNumber() {
    Swal.fire({
      title: 'Enter Card Pin',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (pin) => {
        return fetch(`${DebitCardController}/check-debit-card-pin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: LoginDetailsService.UserId,
            card_number: this.SelectedDebitCard.card_number,
            pin: pin,
          }),
        })
          .then((response: any) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Wrong Pin: Error`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        this.SelectedDebitCard.cvv = result.value.cvv;
        this.ShowCardData = true;
        this.toastr.success('', 'Pin is correct', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      }
    });
  }
  // upgrade debit card

  upgradeDebitCardData(){

    if(this.SelectedUpgradeDebitCard.id.length==0){
      this.toastr.error('', 'Please select card type', {
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return;
    }

    if(!this.SelectedUpgradeDebitCard.checkedTC){
      this.toastr.error('', 'Please agree terms and conditions', {
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return;
    }
    const debitData={
      user_id:LoginDetailsService.UserId,
      card_number:this.SelectedDebitCard.card_number,
      card_type:this.SelectedUpgradeDebitCard.name,
      amount:this.SelectedUpgradeDebitCard.fee,
      account_number:this.AccountNumber
    };
    this.UpgradeCardTab.tab=2;
    this.debitCardController.upgradeDebitCardType(debitData).subscribe(
      (data:any)=>{
        console.log(data);
        setTimeout(()=>{
          this.UpgradeCardTab.loading=false;
        },2000)

      },
      (error)=>{
        console.log(error);

      }
    )



  }
  goToHomePage(){
    location.href="/user/manage-debit-card";
  }

  cardHotListing(){
    if(this.DebitCardHotlistingTab.reason.length==0){
      this.toastr.error('', 'Please select reason', {
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return;
    }



    this.DebitCardHotlistingTab.tab=2;

    this.debitCardController.deActivateDebitCard(LoginDetailsService.UserId,this.SelectedDebitCard.card_number).subscribe(
      (data:any)=>{
        console.log(data);
        setTimeout(()=>{
          this.DebitCardHotlistingTab.loading=false;
        },2000)

      },
      (error)=>{
        console.log(error);

      }
    )

  }

  instantPinGenerationFunc(prev:any,next:any){

    if(prev==1 && next==2){
      if(this.InstantPinGenerationTab.pin.length==0){
        this.toastr.error('', 'Please enter pin', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        return;
      }
      if(this.InstantPinGenerationTab.pin.length!=4){
        this.toastr.error('', 'Please enter 4 digit pin', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        return;
      }
      if(this.InstantPinGenerationTab.re_pin.length==0){
        this.toastr.error('', 'Please enter re-pin', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        return;
      }

      if(this.InstantPinGenerationTab.re_pin!=this.InstantPinGenerationTab.pin){
        this.toastr.error('', 'Pin &  Re-pin are not matched', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        return;
      }
      this.InstantPinGenerationTab.tab=2;
      return;
    }


    this.InstantPinGenerationTab.tab=3;


    const data={
      user_id:LoginDetailsService.UserId,
      card_number:this.SelectedDebitCard.card_number,
      card_pin:this.InstantPinGenerationTab.pin
    }
    this.debitCardController.instantPinGeneration(data).subscribe(
      (data:any)=>{
        console.log(data);

      },
      (error)=>{
        console.log(error);

      }
    )
    setTimeout(()=>{
      this.InstantPinGenerationTab.loading=false;
    },2000)
  }





  tempSelectedDebitCard: any = {
    card_name: 'DEEPENDRA',
    card_type: 'RUPAY SELECT Global Credit Card',
    card_number: '813253063001',
    expiryDate: '11/2026',
    active: true,
  };
}

/**

{
    "card_name": "DEEPENDRA",
    "card_type": "RUPAY SELECT Global Credit Card",
    "card_number": "813253063001",
    "expiryDate": "11/2026",
    "active": true
}

 */
