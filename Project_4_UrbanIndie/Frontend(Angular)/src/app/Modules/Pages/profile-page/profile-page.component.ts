import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTransferServiceService } from 'src/app/Core/Services/DataTransfer/data-transfer-service.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/Core/Services/ControllerService/UserService/user-service.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  @ViewChild('start') start!: MatDatepicker<Date>;
  selectedDate!: Date;

  today_date = new Date();
  constructor(
    private datatranfer: DataTransferServiceService,
    private toast: ToastrService,
    private userdataservice:UserServiceService

  ) { }

  UpdateDetails: boolean = false;
  UserData = {
    user_id: "",
    name: "",
    email: "",
    picture_url: "",
    phone_number: "",
    gender: "",
    date_of_birth: ""
  }



  ngOnInit(): void {

    this.datatranfer.UserData.subscribe(
      (data) => {
        this.UserData = data;
      },

    )
  }

  updateUserData() {
    this.UpdateDetails = true;
  }

  saveUserData() {
    if (this.UserData.phone_number == null || this.UserData.phone_number.length != 10) {
      this.toast.error('Error!!', 'Phone Number is not valid', {
        positionClass: 'toast-top-right',
        progressBar: true,
        timeOut: 3000
      })
      return;
    }
    if (this.selectedDate != null) {
      let date = this.selectedDate.getDate() + '/' + (this.selectedDate.getMonth() + 1) + '/' + this.selectedDate.getFullYear()
      this.UserData.date_of_birth = date;
    }

    this.UpdateDetails = false;

    this.userdataservice.updateUserData(this.UserData);



  }

  openStartDatePicker() {
    this.start.open();
  }





}
