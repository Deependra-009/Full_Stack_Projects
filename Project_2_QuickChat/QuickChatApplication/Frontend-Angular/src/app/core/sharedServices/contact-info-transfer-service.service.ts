import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoTransferServiceService {
  private selectedUserData = new BehaviorSubject<any>(null);
  selectedUserData$ = this.selectedUserData.asObservable();

  setSelectedUserData(data: any): void {
    this.selectedUserData.next(data);
  }
}
