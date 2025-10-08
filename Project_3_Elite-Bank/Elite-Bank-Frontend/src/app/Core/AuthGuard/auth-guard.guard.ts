import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../AuthService/auth-service.service';
import { Inject, inject } from '@angular/core';

const authService=new AuthServiceService();
const router=Inject(Router);

export const authGuardGuard: CanActivateFn = (route, state) => {


  if(authService.ifUserLoggedIn()){
    console.log(authService.getAccessTokenFromCookie());

    return true;
  }


  window.location.href="/login";
  return false;
};


