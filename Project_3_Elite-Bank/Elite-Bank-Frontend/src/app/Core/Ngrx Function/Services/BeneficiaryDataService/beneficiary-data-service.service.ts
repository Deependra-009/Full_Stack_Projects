import { Injectable } from '@angular/core';
import { ControllerService } from 'src/app/Core/Controller/User/controller.service';
import { RootReducerState, getBeneficiaryData, getBeneficiaryLoaded, getBeneficiaryLoading } from '../../NGRX/Reducer';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, take } from 'rxjs';
import { LoginDetailsService } from '../LoginDetailsService/login-details.service';
import { BeneficiaryDetailsRequestAction, BeneficiaryDetailsSuccessAction } from '../../NGRX/Action/BeneficiaryDataAction';
import { BeneficiaryControllerService } from 'src/app/Core/Controller/Beneficiary/beneficiary-controller.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryDataServiceService {

  constructor(
    private store: Store<RootReducerState>,
    private beneficiarydata: BeneficiaryControllerService,
    private toast:ToastrService,
    private router:Router
  ) { }

  getBeneficiaryObservable(): [Observable<any>, Observable<Boolean>, Observable<Boolean>] {
    const loading$ = this.store.select(getBeneficiaryLoading);
    const loaded$ = this.store.select(getBeneficiaryLoaded);
    const beneficiarydata$ = this.store.select(getBeneficiaryData);

    return [beneficiarydata$, loading$, loaded$];

  }

  getBeneficiaryDataFunction(force = false) {
    const loading$ = this.store.select(getBeneficiaryLoading);
    const loaded$ = this.store.select(getBeneficiaryLoaded);
    const beneficiarydata$ = this.store.select(getBeneficiaryData);


    combineLatest([loading$, loaded$]).pipe(
      take(1)
    ).subscribe((data) => {
      if (!data[0] && !data[1] || force) {
        this.store.dispatch(new BeneficiaryDetailsRequestAction())
        this.beneficiarydata.getAllBeneficiary(LoginDetailsService.UserId)
          .subscribe((response: any) => {
            
            this.store.dispatch(new BeneficiaryDetailsSuccessAction({ BeneficiaryData: response }))

          },
            (error) => {
              console.log(error);

            })
      }
    })
  }

  addBeneficiaryData(data: any) {    
    
    this.beneficiarydata.addBeneficiary(data).subscribe(
      (data) => {
        console.log(data);
        this.getBeneficiaryDataFunction(true);
        this.toast.success('', 'Beneficiary Add Successfully', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',

        });
        this.router.navigate(['/user/fund-transfer-page']);

      },
      (error) => {
        this.toast.error('', 'Beneficiary Already Exist', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',

        });
      }
    );
  }

  deleteBeneficiaryData(data: any) {
    this.beneficiarydata.deleteBeneficiary(data.user_id,data.account_number).subscribe(
      (data:any)=>{
        this.toast.success('', 'Beneficiary Delete Successfully', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',

        });  
      },
      (error)=>{
        console.log(error);
        
      }
    )
    
    }
  

}
