import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Module/Component/nav-bar/nav-bar.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './Module/Page/Account/home-page/home-page.component';
import { BeneficiaryMaintenanceComponent } from './Module/Page/Pay&Transfer/beneficiary-maintenance/beneficiary-maintenance.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DepositSummaryComponent } from './Module/Page/Deposit/deposit-summary/deposit-summary.component';
import { OpenNewTermDepositComponent } from './Module/Page/Deposit/open-new-term-deposit/open-new-term-deposit.component';
import { TermDepositDetailsComponent } from './Module/Page/Deposit/term-deposit-details/term-deposit-details.component';
import { FundTransferComponent } from './Module/Page/Pay&Transfer/fund-transfer/fund-transfer.component';
import { ManageFavouriteComponent } from './Module/Page/Pay&Transfer/manage-favourite/manage-favourite.component';
import { StatementComponent } from './Module/Page/Account/statement/statement.component';
import { NewDebitCardComponent } from './Module/Page/Card/new-debit-card/new-debit-card.component';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthInterceptor,
  authInterceptorProviders,
} from './Core/AuthGuard/auth-interceptor';
import { LoginComponent } from './Module/Page/User/Login/login.component';
import { LandingPageComponent } from './Module/Page/LandingPage/landing-page/landing-page.component';
import { WelcomePageComponent } from './Module/Page/welcome-page/welcome-page.component';
import { FooterComponent } from './Module/Component/footer/footer.component';
import { ProfileComponent } from './Module/Page/profile/profile.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './Core/Ngrx Function/NGRX/Reducer';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ManageDebitCardComponent } from './Module/Page/Card/manage-debit-card/manage-debit-card.component';
import { NewCreditCardComponent } from './Module/Page/Card/new-credit-card/new-credit-card.component';
import { ManageCreditCardComponent } from './Module/Page/Card/manage-credit-card/manage-credit-card.component';
import { ToastrModule } from 'ngx-toastr';
import { ManageBeneficiaryComponent } from './Module/Page/Pay&Transfer/manage-beneficiary/manage-beneficiary.component';
import { PaymentPageComponent } from './Module/Page/Pay&Transfer/payment-page/payment-page.component';
import { ApplyForLoanComponent } from './Module/Page/Loans/apply-for-loan/apply-for-loan.component';
import { LoanSummaryComponent } from './Module/Page/Loans/loan-summary/loan-summary.component';
import { LoanCalculatorComponent } from './Module/Page/Loans/loan-calculator/loan-calculator.component';
import { LoanSummaryViewDetailsComponent } from './Module/Page/Loans/loan-summary/loan-summary-view-details/loan-summary-view-details.component';
import { DebitCardDetailsViewPageComponent } from './Module/Page/Card/manage-debit-card/debit-card-details-view-page/debit-card-details-view-page.component';
import { CreditCardDetailsViewPageComponent } from './Module/Page/Card/manage-credit-card/credit-card-details-view-page/credit-card-details-view-page.component';
import { RegisterComponent } from './Module/Page/User/Register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    FundTransferComponent,
    BeneficiaryMaintenanceComponent,
    StatementComponent,
    ManageFavouriteComponent,
    DepositSummaryComponent,
    OpenNewTermDepositComponent,
    TermDepositDetailsComponent,
    NewDebitCardComponent,
    LoginComponent,
    LandingPageComponent,
    WelcomePageComponent,
    FooterComponent,
    ProfileComponent,
    ManageDebitCardComponent,
    NewCreditCardComponent,
    ManageCreditCardComponent,
    ManageBeneficiaryComponent,
    PaymentPageComponent,

    DebitCardDetailsViewPageComponent,
    CreditCardDetailsViewPageComponent,
    ApplyForLoanComponent,
    LoanSummaryComponent,
    LoanCalculatorComponent,
    LoanSummaryViewDetailsComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    GoogleChartsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forRoot(rootReducer, {}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// http://localhost:8080/login/oauth2/code/google
