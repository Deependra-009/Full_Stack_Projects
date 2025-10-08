import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthServiceFunctionsService } from "../AuthServiceFunctions/auth-service-functions.service";

const TOKEN_HEADER = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authservice:AuthServiceFunctionsService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //add the jwt token(localstorage) request
        let authreq = req;
        const token = this.authservice.getAccessTokenFromCookie();

        if (token != null) {
            authreq = authreq.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }   
        
        // throw new Error("Method not implemented.");
        return next.handle(authreq);
    }
}
