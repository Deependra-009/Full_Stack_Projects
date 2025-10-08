import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferServiceService {

  constructor(

  ) {

  }

  UserData=new BehaviorSubject({
    user_id:"",
    name:"",
    email:"",
    picture_url:"",
    phone_number:"",
    gender:"",
    date_of_birth:""
  })


  //for spinner at product page list 
  private spinnerValue: boolean = false;

  setSpinner(value: boolean): void {
    this.spinnerValue = value;
  }

  getSpinner(): boolean {
    return this.spinnerValue;
  }
  //end of spinner




  SearchQuery = new BehaviorSubject("");
  public CartLength = new BehaviorSubject(0);

  CartData: any = []
  AddressData: any;
  private addressSelectedSubject = new BehaviorSubject<boolean>(false);
  addressSelected$: Observable<boolean> = this.addressSelectedSubject.asObservable();

  PaymentData: any;
  private paymentSelectedSubject = new BehaviorSubject<boolean>(false);
  paymentSelected$: Observable<boolean> = this.paymentSelectedSubject.asObservable();

  //properties for amount breakup page
  totalMRP: number = 0;
  totalPrice: number = 0;
  totalDiscount: number = 0;

  private totalMRPSubject = new BehaviorSubject<number>(0);
  totalMRPObservable: Observable<number> = this.totalMRPSubject.asObservable();

  private totalPriceSubject = new BehaviorSubject<number>(0);
  totalPriceObservable: Observable<number> = this.totalPriceSubject.asObservable();

  private totalDiscountSubject = new BehaviorSubject<number>(0);
  totalDiscountObservable: Observable<number> = this.totalDiscountSubject.asObservable();





  setCartData(data: any) {
    this.CartData = data;
    this.calculateTotals();
  }


  private calculateTotals() {
    if (!this.CartData) {
      this.totalMRP = 0;
      this.totalPrice = 0;
      return;
    }

    this.totalMRP = this.CartData.reduce((totalMRP: number, item: any) =>
      totalMRP + (parseInt(item.product_mrp) * parseInt(item.product_quantity)), 0);

    this.totalPrice = this.CartData.reduce((totalPrice: number, item: any) =>
      totalPrice + (parseInt(item.product_price) * parseInt(item.product_quantity)), 0);
    // Calculate total discount
    this.totalDiscount = this.totalMRP - this.totalPrice;
    // Update BehaviorSubjects with the new totals
    this.totalMRPSubject.next(this.totalMRP);
    this.totalPriceSubject.next(this.totalPrice);
    this.totalDiscountSubject.next(this.totalDiscount);
  }







  setAddressData(data: any) {
    this.AddressData = data;
    this.updateAddressSelected(!!this.AddressData);
  }

  setPaymentData(data: any) {
    this.PaymentData = data;
    this.updatePaymentSelected(!!this.PaymentData);

  }
  getPaymentData() {
    return this.PaymentData;
  }
  getCartData() {
    return this.CartData;
  }

  getAddressData() {
    return this.AddressData;
  }
  /******************* Product Page Data ****************************/

  selectProductData: any;

  setSelectProductData(data: any) {
    this.selectProductData = data;
  }

  getSelectProductData() {
    return this.selectProductData;
  }
  /*************continue disable feature if no color or size selected in cart*********************/
  incompleteProductInfo: { incomplete: boolean, productId: string | null } = { incomplete: false, productId: null };
  private incompleteProductInfoSubject = new BehaviorSubject<{
    incomplete: boolean;
    productId: string | null;
  }>({ incomplete: true, productId: null });

  incompleteProductInfo$: Observable<{
    incomplete: boolean;
    productId: string | null;
  }> = this.incompleteProductInfoSubject.asObservable();

  // Update incompleteProductInfo data
  updateIncompleteProductInfo(info: {
    incomplete: boolean;
    productId: string | null;
  }): void {
    this.incompleteProductInfoSubject.next(info);
  }
  /*************continue disable feature if no address is selected*********************/
  private updateAddressSelected(selected: boolean) {
    this.addressSelectedSubject.next(selected);
  }
  /*************continue disable feature if no payment is selected*********************/
  private updatePaymentSelected(selected: boolean) {
    this.paymentSelectedSubject.next(selected);
  }

  /*************scroll feature*********************/
  private continueButtonClickSubject = new BehaviorSubject<string | null>(null);


  emitContinueButtonClick(pid: string) {
    this.continueButtonClickSubject.next(pid);
  }

  onContinueButtonClick(): Observable<string | null> {
    return this.continueButtonClickSubject.asObservable();
  }

  /*************cookies save feature*********************/
  static saveSearchText(searchtext:String){
    document.cookie = `URBAN_INDIE_SEARCH_TEXT=${searchtext}; path=/;`;    
  }

  static getSearchText() {
    const name = `URBAN_INDIE_SEARCH_TEXT=`;
    const cookies = document.cookie.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
  
      if (cookie.startsWith(name)) {
        return cookie.substring(name.length);
      }
    }
  
    return null;
  }

  static removeSearchTextFromCookie() {
    document.cookie = `URBAN_INDIE_SEARCH_TEXT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;   
  }
}
