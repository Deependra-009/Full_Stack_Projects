import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../AuthService/auth-service.service';

const TOKEN_HEADER = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //add the jwt token(localstorage) request

    const token = this.authService.getAccessTokenFromCookie();
    console.log('auth interceptr: ', token);

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.

    const authToken=`Bearer ${token}`;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });

    console.log(authReq);


    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
// const authToken=`Bearer ${token}`;
export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
