import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP errors here, e.g., log them or display a user-friendly message.
        return throwError(error);
      })
    );
  }
}
