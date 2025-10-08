import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceFunctionsService } from '../AuthServiceFunctions/auth-service-functions.service';


const authService=new AuthServiceFunctionsService();
const router=Inject(Router);

export const authGuardGuard: CanActivateFn = (route, state) => {
  
    
  if(authService.ifUserLoggedIn() || true){
    return true;
  }

  
  window.location.href="/";
  return false;
};

