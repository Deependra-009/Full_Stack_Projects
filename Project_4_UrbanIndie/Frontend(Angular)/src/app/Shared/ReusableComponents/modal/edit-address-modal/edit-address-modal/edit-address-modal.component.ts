import { Component, EventEmitter, Input, Output,  SimpleChanges } from '@angular/core';
import { AuthServiceFunctionsService } from 'src/app/Core/Authentication/AuthServiceFunctions/auth-service-functions.service';
import { AddressServiceService } from 'src/app/Core/Services/ControllerService/AddressService/address-service.service';

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.component.html',
  styleUrls: ['./edit-address-modal.component.css']
})
export class EditAddressModalComponent {
  @Input() addressData: any | null = null;
  @Output() updateAddressEvent = new EventEmitter<any>();
  @Input() isVisible = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor(
    private addressService: AddressServiceService  ) {}
  editedAddressData: any = {};
  ngOnChanges(changes: SimpleChanges) {
    if (changes['addressData'] && changes['addressData'].currentValue) {
      this.editedAddressData = { ...changes['addressData'].currentValue };
  }
}
  updateAddress() {
  const updatedAddress = { ...this.editedAddressData, user_id: String(AuthServiceFunctionsService.getAccessUserFromCookie()) };


    this.addressService.updateAddress(updatedAddress).subscribe(
      response => {
        this.updateAddressEvent.emit(this.editedAddressData);
        this.isVisible= false;
      },
      error => {
        console.error('Error updating address', error);
      }
    );
  }


  closeModal() {
    this.isVisible = false;
    this.closeModalEvent.emit();
  }
}
