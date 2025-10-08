import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export  class AuthServiceService {

  COOKIE_NAME="ELITE_BANKING_COOKIE";

  refreshTokenTimeout!:any;

  constructor(
  ) { }



  saveToken(token:String){
    document.cookie = `${this.COOKIE_NAME}=${token}; path=/;`;
  }

  removeTokenFromCookie() {
    document.cookie = `${this.COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  ifUserLoggedIn():Boolean{
    const token=this.getAccessTokenFromCookie();
    if(token!=null && !this.isTokenExpired(token)) return true;
    return false;
  }

  getAccessTokenFromCookie() {
    const name = `${this.COOKIE_NAME}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();

      if (cookie.startsWith(name)) {
        return cookie.substring(name.length);
      }
    }

    return null;
  }

  isTokenExpired(token:any) {
    const tokenExpiration = this.getTokenExpiration(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if(tokenExpiration==null) return true;
    return tokenExpiration > currentTime?false:true;
  }

  getTokenExpiration(token:String) {
    const decodedToken = this.decodeToken(token);
    // console.log(decodedToken);

    if (!decodedToken) {
      return null;
    }

    const expirationTime = decodedToken.exp;

    return expirationTime;
  }

  decodeToken(token:String){
    let jwt = JSON.parse(atob(token.split('.')[1]));
    return jwt;
  }






}
