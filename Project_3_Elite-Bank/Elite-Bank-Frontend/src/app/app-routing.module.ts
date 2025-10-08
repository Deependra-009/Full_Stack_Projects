import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './Module/Component/nav-bar/nav-bar.component';
import { HomePageComponent } from './Module/Page/Account/home-page/home-page.component';
import { BeneficiaryMaintenanceComponent } from './Module/Page/Pay&Transfer/beneficiary-maintenance/beneficiary-maintenance.component';

import { DepositSummaryComponent } from './Module/Page/Deposit/deposit-summary/deposit-summary.component';
import { OpenNewTermDepositComponent } from './Module/Page/Deposit/open-new-term-deposit/open-new-term-deposit.component';
import { TermDepositDetailsComponent } from './Module/Page/Deposit/term-deposit-details/term-deposit-details.component';
import { FundTransferComponent } from './Module/Page/Pay&Transfer/fund-transfer/fund-transfer.component';
import { ManageFavouriteComponent } from './Module/Page/Pay&Transfer/manage-favourite/manage-favourite.component';
import { StatementComponent } from './Module/Page/Account/statement/statement.component';
import { NewDebitCardComponent } from './Module/Page/Card/new-debit-card/new-debit-card.component';
import { authGuardGuard } from './Core/AuthGuard/auth-guard.guard';
import { LoginComponent } from './Module/Page/User/Login/login.component';
import { LandingPageComponent } from './Module/Page/LandingPage/landing-page/landing-page.component';
import { WelcomePageComponent } from './Module/Page/welcome-page/welcome-page.component';
import { ProfileComponent } from './Module/Page/profile/profile.component';
import { ManageDebitCardComponent } from './Module/Page/Card/manage-debit-card/manage-debit-card.component';
import { NewCreditCardComponent } from './Module/Page/Card/new-credit-card/new-credit-card.component';
import { ManageCreditCardComponent } from './Module/Page/Card/manage-credit-card/manage-credit-card.component';
import { ManageBeneficiaryComponent } from './Module/Page/Pay&Transfer/manage-beneficiary/manage-beneficiary.component';
import { PaymentPageComponent } from './Module/Page/Pay&Transfer/payment-page/payment-page.component';
import { ApplyForLoanComponent } from './Module/Page/Loans/apply-for-loan/apply-for-loan.component';
import { LoanSummaryComponent } from './Module/Page/Loans/loan-summary/loan-summary.component';
import { LoanSummaryViewDetailsComponent } from './Module/Page/Loans/loan-summary/loan-summary-view-details/loan-summary-view-details.component';
import { DebitCardDetailsViewPageComponent } from './Module/Page/Card/manage-debit-card/debit-card-details-view-page/debit-card-details-view-page.component';
import { CreditCardDetailsViewPageComponent } from './Module/Page/Card/manage-credit-card/credit-card-details-view-page/credit-card-details-view-page.component';
import { RegisterComponent } from './Module/Page/User/Register/register.component';

const routes: Routes = [
  {
    path:'',
    component:LandingPageComponent,
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'user',
    component:WelcomePageComponent,
    canActivate:[authGuardGuard],
    children:[
      {
        path:'',
        component:HomePageComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'fund-transfer-page',
        component:FundTransferComponent
      },
      {
        path:'beneficiary-maintenance-page',
        component:BeneficiaryMaintenanceComponent,
      },
      {
        path:'manage-beneficiary',
        component:ManageBeneficiaryComponent

      },
      {
        path:'payment-page/:payment-type',
        component:PaymentPageComponent
      },
      {
        path:'statement',
        component:StatementComponent,
      },
      {
        path:'manager-favourites-page',
        component:ManageFavouriteComponent,
      },
      {
        path:'deposit-summary',
        component:DepositSummaryComponent,
      },
      {
        path:'open-new-term-deposit',
        component:OpenNewTermDepositComponent
      },
      {
        path:'term-deposit-details',
        component:TermDepositDetailsComponent
      },
      {
        path:'new-debit-card',
        component:NewDebitCardComponent
      },
      {
        path:'manage-debit-card',
        component:ManageDebitCardComponent
      },
      {
        path:'new-credit-card',
        component:NewCreditCardComponent
      },
      {
        path:'manage-credit-card',
        component:ManageCreditCardComponent
      },
      {
        path:'debit-card-detail',
        component:DebitCardDetailsViewPageComponent
      },
      {
        path:'credit-card-detail',
        component:CreditCardDetailsViewPageComponent
      },
      {
        path:'apply-for-loan',
        component:ApplyForLoanComponent
      },
      {
        path:'loan-summary',
        component:LoanSummaryComponent
      },
      {
        path:'loan-details-page',
        component:LoanSummaryViewDetailsComponent
      }

    ]

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
