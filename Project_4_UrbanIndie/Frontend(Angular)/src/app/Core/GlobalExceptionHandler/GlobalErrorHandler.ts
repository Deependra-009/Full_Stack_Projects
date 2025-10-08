import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Handle the error here (e.g., log it, display a message to the user).

    // console.log(error);
    
  }
}
