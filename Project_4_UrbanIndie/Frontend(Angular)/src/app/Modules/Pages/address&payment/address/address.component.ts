import { Component, OnInit } from '@angular/core';
import { DataTransferServiceService } from 'src/app/Core/Services/DataTransfer/data-transfer-service.service';
import { AddressServiceService } from 'src/app/Core/Services/ControllerService/AddressService/address-service.service';
import { AuthServiceFunctionsService } from 'src/app/Core/Authentication/AuthServiceFunctions/auth-service-functions.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  modalService: any;

  ngOnInit(): void {
    this.formData.addressType = 'Home';
    this.fetchAddresses(String(AuthServiceFunctionsService.getAccessUserFromCookie()));
    this.SelectedAddress();
  }


  //add new address form
  formData = {
    userId: String(AuthServiceFunctionsService.getAccessUserFromCookie()),
    name: '',
    mobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    addressState: '',
    addressCity: '',
    isDefaultAddress: 'true',
    addressType: '',
    addressPinCode: ''
  }

  constructor(
    // private router: Router,
    private datatransfer: DataTransferServiceService,
    private addressService: AddressServiceService) { }
  isAddAddress: any;
  selectedAddress: any;
  addresses: any = []

  SelectedAddress() {
    if (this.selectedAddress) {
      this.datatransfer.setAddressData(this.selectedAddress);
    } else {
      console.log('No address selected');
    }
  }
  async removeAddress(id: string) {
    try {
      await this.addressService.deleteAddressByIdAndUserId(id, String(AuthServiceFunctionsService.getAccessUserFromCookie()))
        .subscribe(async (response) => {
          this.addresses = this.addresses.filter((address: { id: string; }) => address.id !== id);

        }, (error) => {
          console.error(`Error deleting address with ID ${id}:`, error);
        });
    } catch (error) {
      console.error(`Error deleting address with ID ${id}:`, error);
    }
  }

  async saveAddress() {
  // Retrieve the user ID from the cookie
  const userId = AuthServiceFunctionsService.getAccessUserFromCookie();

  if (userId) {
    // Set the user ID in the formData
    this.formData.userId = userId;

    // Send the address data to the backend
    this.addressService.saveAddress(this.formData).subscribe(
      (newAddress) => {
        this.addresses.push(newAddress);
        this.isAddAddress = false;

        // Fetch the updated list of addresses
        this.fetchAddresses(this.formData.userId);

        // Reset the form
        this.resetForm();
      },
      (error) => {
      }
    );
  } else {
  }
  }


  // get all addresses of user
  async fetchAddresses(userId: String) {
    this.addressService.getAllAddresses(userId).subscribe(
      (addresses) => {
        this.addresses = addresses;
        // Check if there is a default address
        const defaultAddress = this.addresses.find(
          (address: { isDefaultAddress: any }) => address.isDefaultAddress
        );

        if (defaultAddress) {
          // Update selectedAddress with the default address
          this.selectedAddress = defaultAddress;
          // Update the selected address in the shared service
          this.datatransfer.setAddressData(this.selectedAddress);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Method to reset the Address form
  resetForm() {
    this.formData = {
      userId: "",
      name: '',
      mobileNumber: '',
      addressLine1: '',
      addressLine2: '',
      addressState: '',
      addressCity: '',
      isDefaultAddress: 'false',
      addressType: '',
      addressPinCode: ''
    };
  }

  modalVisible = false;
  toUpdateAddress: any = {};
  openModal(address: any) {
    this.toUpdateAddress = address;
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  onAddressUpdate(updatedAddress: any) {
    const index = this.addresses.findIndex((address: { id: String; }) => address.id === updatedAddress.id);
    if (index !== -1) {
      this.addresses[index] = updatedAddress;
    }
    this.modalVisible = false;
  }

}
